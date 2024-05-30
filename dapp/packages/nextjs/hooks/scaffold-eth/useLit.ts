// ** Hooks
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { Wallet } from "ethers";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

/////////////////////////////////////
export function useLit() {
  const litActionCode = `
const go = async () => {  
  const url = "https://hack-2024-tok9d.ondigitalocean.app";
  const resp = await fetch(url).then((response) => response.json());
  const isValid = resp.data.valid;

  // only sign if the score is valid
  if (!isValid) {
    return;
  }
  
  // Signes the message with the score to send the transaction
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey , sigName });
};

go();
`;

  const runLitAction = async (score: string) => {
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: "manzano",
      debug: true,
    });

    await client.connect();

    const messageHash = ethers.solidityPackedKeccak256(["uint"], [score]);

    const messageHashBinary = ethers.getBytes(messageHash);

    const auth = await generateAuthSig(client);

    const signatures = await client.executeJs({
      code: litActionCode,
      sessionSigs: auth,
      jsParams: {
        toSign: messageHashBinary,
        publicKey: process.env.NEXT_PUBLIC_LIT_PUBK ?? "",
        sigName: "sig1",
      },
    });

    return signatures;
  };

  const generateAuthSig = async (client: any) => {
    const nonce = await client?.getLatestBlockhash();
    const walletSigner = new Wallet(process.env.NEXT_PUBLIC_WALLET_PK ?? "");
    const signerAddress = await walletSigner.getAddress();

    const domain = "localhost";
    const origin = "https://localhost/login";
    const statement = "This is a test statement.";

    const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString();

    const siweMessage = new SiweMessage({
      domain,
      address: signerAddress,
      statement,
      uri: origin,
      version: "1",
      chainId: 137,
      nonce,
      expirationTime,
    });
    const messageToSign = siweMessage.prepareMessage();

    const signature = await walletSigner.signMessage(messageToSign);

    const authSig = {
      sig: signature,
      derivedVia: "web3.eth.personal.sign",
      signedMessage: messageToSign,
      address: signerAddress,
    };

    return authSig;
  };

  return {
    runLitAction,
  };
}
