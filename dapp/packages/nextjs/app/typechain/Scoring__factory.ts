/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "./common";
import type { Scoring, ScoringInterface } from "./Scoring";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "score",
        type: "uint256",
      },
    ],
    name: "ScoreRecorded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_score",
        type: "uint256",
      },
    ],
    name: "addScore",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "scores",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161026638038061026683398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b6080516101dc61008a6000396000609301526101dc6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806310b2afce1461004657806376dd110f1461005b5780638da5cb5b1461008e575b600080fd5b610059610054366004610136565b6100cd565b005b61007b61006936600461014f565b60006020819052908152604090205481565b6040519081526020015b60405180910390f35b6100b57f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610085565b33600090815260208190526040812080548392906100ec90849061017f565b909155505033600081815260208181526040918290205491519182527f49a4a744d867bf4e869d90a3f297ed819fbcf090c50c918f739c482556255594910160405180910390a250565b60006020828403121561014857600080fd5b5035919050565b60006020828403121561016157600080fd5b81356001600160a01b038116811461017857600080fd5b9392505050565b808201808211156101a057634e487b7160e01b600052601160045260246000fd5b9291505056fea26469706673582212208ec0d4815f94acbd16f671f00ca5fe748713bcf48cf9b8fd611f2ce930f3bc0a64736f6c63430008110033";

type ScoringConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ScoringConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Scoring__factory extends ContractFactory {
  constructor(...args: ScoringConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_owner, overrides || {});
  }
  override deploy(
    _owner: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_owner, overrides || {}) as Promise<
      Scoring & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Scoring__factory {
    return super.connect(runner) as Scoring__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ScoringInterface {
    return new Interface(_abi) as ScoringInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Scoring {
    return new Contract(address, _abi, runner) as unknown as Scoring;
  }
}
