import { ethereumPublicClient, polygonPublicClient } from "../../utils/config";
import { AccessToken, Role } from "@huddle01/server-sdk/auth";
 
export const dynamic = "force-dynamic";
 
export async function POST(request: Request) {
 
  // Get data from request body
  const { roomId, signature, address, expirationTime, message } =
    await request.json();
 
  if (!roomId || !signature || !address) {
    return new Response("Incorrect request", { status: 400 });
  }
 
  // Verify if signature is expired or not
  if (expirationTime < Date.now()) {
    return new Response("Signature expired", { status: 400 });
  }
 
  // Call `room-details` API to get token gating details
  const roomDetailsResponse = await fetch(
    `https://api.huddle01.com/api/v1/room-details/${roomId}`,
    {
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
    }
  );
 
  const roomDetails = await roomDetailsResponse.json();
 
  if (!roomDetails?.tokenGatingInfo) {
    return new Response("Room is not token gated", { status: 400 });
  }
 
  // Set public client based on chain
  const publicClient =
    roomDetails.tokenGatingInfo.tokenGatingConditions[0].chain === "ETHEREUM"
      ? ethereumPublicClient
      : polygonPublicClient;
 
  // Verify signature
  const verify = await publicClient.verifyMessage({
    address,
    message,
    signature,
  });
 
  // If signature is verified then we will check if user holds the token or not
  if (verify) {
    const contractResponse = await publicClient.readContract({
      address:
        roomDetails.tokenGatingInfo.tokenGatingConditions[0].contractAddress,
      abi: [
        {
          inputs: [{ name: "owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "balanceOf",
      args: [address],
    });
    const balance = Number(contractResponse);
 
    if (balance < 1) {
      return new Response("You don't hold token to join this room", {
        status: 400,
      });
    } else {
      
      // If user holds the token then we will generate access token
      const accessToken = new AccessToken({
        apiKey: process.env.API_KEY!,
        roomId: roomId as string,
        role: Role.HOST,
        permissions: {
          admin: true,
          canConsume: true,
          canProduce: true,
          canProduceSources: {
            cam: true,
            mic: true,
            screen: true,
          },
          canRecvData: true,
          canSendData: true,
          canUpdateMetadata: true,
        },
      });
 
      const token = await accessToken.toJwt();
      return new Response(token, { status: 200 });
    }
  } else {
    return new Response("Incorrect signature", { status: 400 });
  }