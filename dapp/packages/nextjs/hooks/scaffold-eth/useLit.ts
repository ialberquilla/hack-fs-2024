// ** Hooks
import { useEffect, useState } from "react";
import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";

/////////////////////////////////////
export function useLit() {
  useEffect(() => {
    connect();
  }, []);

  const [client, setClient] = useState<LitJsSdk.LitNodeClient | null>(null);

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
      litNetwork: "cayenne",
      debug: true,
    });

    await client.connect();

    setClient(client);
  };

  const runLitAction = async () => {
    let workingClient;

    workingClient = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: false,
      litNetwork: "manzano",
      debug: true,
    });

    await workingClient.connect();

    const sessionSigs = await workingClient?.getSessionSigs({
      chain: "sepolia",
      resourceAbilityRequests: [],
    });

    console.log({ sessionSigs });

    const signatures = await workingClient?.executeJs({
      code: litActionCode,
      sessionSigs: {},
      jsParams: {
        toSign: "message",
        publicKey: "0x02e5896d70c1bc4b4844458748fe0f936c7919d7968341e391fb6d82c258192e64",
        sigName: "sig1",
      },
    });
    console.log("signatures: ", signatures);
  };

  return {
    client,
    runLitAction,
  };
}
