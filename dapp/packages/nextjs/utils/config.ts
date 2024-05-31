import { http, createConfig } from "@wagmi/core";
import { mainnet, polygon } from "@wagmi/core/chains";
import { createPublicClient } from "viem";

export const config = createConfig({
  chains: [mainnet, polygon],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

export const ethereumPublicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const polygonPublicClient = createPublicClient({
  chain: polygon,
  transport: http(),
});

export const tiersRoom = {
  "1": "bsa-bcbj-omw",
  "2": "amn-iplw-ehp",
  "3": "upq-fwor-ibs",
}