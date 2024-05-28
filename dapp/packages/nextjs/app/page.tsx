"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { Unity, useUnityContext } from "react-unity-webgl";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const { unityProvider } = useUnityContext({
    loaderUrl: "build/build3.loader.js",
    dataUrl: "build/webgl.data",
    frameworkUrl: "build/build.framework.js",
    codeUrl: "build/build.wasm",
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-4">
        <div className="px-2">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Tweek</span>
          </h1>
        </div>
        <div className="flex-grow bg-base-300 w-full mt-6 px- py-4 flex justify-center items-center">
          <Unity unityProvider={unityProvider} style={{ width: '800px', height: '600px' }}/>
        </div>
      </div>
    </>
  );
};

export default Home;
