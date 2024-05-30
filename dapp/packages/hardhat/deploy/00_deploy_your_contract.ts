import { ethers, network } from "hardhat";

async function main() {

  const Scoring = await ethers.getContractFactory("Scoring");

  // Start deployment, returning a promise that resolves to a contract object
  const scoring = await Scoring.deploy("0x7C61C48919805eDC3Bd75ace9d7211Fb3b0Ed13D");

  console.log("Scoring deployed to:", await scoring.getAddress());


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
