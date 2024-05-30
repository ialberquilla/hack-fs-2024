// ** Hooks
import { useEffect, useState } from "react";
import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { Signer, Wallet, ethers } from "ethers";
import { SiweMessage } from 'siwe';
/////////////////////////////////////
export function useLit() {
  useEffect(() => {
    connect();
  }, []);

  const [client, setClient] = useState<LitJsSdk.LitNodeClient | null>(null);
  const [authSig, setAuthSig] = useState<any | null>(null);

  const litActionCode = `
const go = async () => {  
  const url = "https://api.weather.gov/gridpoints/TOP/31,80/forecast";
  const resp = await fetch(url).then((response) => response.json());
  const temp = resp.properties.periods[0].temperature;

  // only sign if the temperature is above 60.  if it's below 60, exit.
  if (temp < 60) {
    return;
  }
  
  // this requests a signature share from the Lit Node
  // the signature share will be automatically returned in the HTTP response from the node
  // all the params (toSign, publicKey, sigName) are passed in from the LitJsSdk.executeJs() function
  const sigShare = await LitActions.signEcdsa({ toSign, publicKey , sigName });
};

go();
`;

  const connect = async () => {
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: "manzano",
      debug: true,
    });

    await client.connect();

    setClient(client);

    const auth = await generateAuthSig();

    const signatures = await client.executeJs({
        code: litActionCode,
        sessionSigs: auth,
        jsParams: {
          toSign: "message",
          publicKey: "0x02e5896d70c1bc4b4844458748fe0f936c7919d7968341e391fb6d82c258192e64",
          sigName: "sig1",
        },
      });

      console.log("signatures: ", signatures);

  };

  const runLitAction = async () => {

  };

  const generateAuthSig = async () => {
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

    setAuthSig(authSig);
    return authSig;
  };

  return {
    client,
    runLitAction,
  };
}
