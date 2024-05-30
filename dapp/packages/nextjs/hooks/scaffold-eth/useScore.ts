// ** Hooks
import { useState } from "react";
import { Scoring__factory } from "../../app/typechain/Scoring__factory";
import { useWriteContract } from "wagmi";

type WriteFnNames = "addScore";

/////////////////////////////////////
export function useSoring() {
  const [isLoading, setIsLoading] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const scoreAddress = "0x407133209fd8Adaf3fcd3bEcD2A94082f1B1EB28"

  const executeManagerAction = async (functionName: WriteFnNames, ...args: any) => {
    try {
      setIsLoading(true);
      return await writeContractAsync({
        abi: Scoring__factory.abi,
        address: scoreAddress as `0x${string}`,
        functionName,
        args,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addScore: (score: number) =>
      executeManagerAction("addScore", {
        score: BigInt(score),
      }),
  };
}
