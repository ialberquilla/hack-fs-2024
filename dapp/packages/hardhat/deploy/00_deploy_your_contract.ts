import { ethers, network } from "hardhat";

async function main() {

  const Scoring = await ethers.getContractFactory("Scoring");

  // Start deployment, returning a promise that resolves to a contract object
  const scoring = await Scoring.deploy("0x7C61C48919805eDC3Bd75ace9d7211Fb3b0Ed13D");

  console.log("Scoring deployed to:", await scoring.getAddress());

  const NFT = await ethers.getContractFactory("NFTTier");

  const nftTier1 = await NFT.deploy();
  const nftTier2 = await NFT.deploy();
  const nftTier3 = await NFT.deploy();

  console.log("NFT Tier 1 deployed to:", await nftTier1.getAddress());
  console.log("NFT Tier 2 deployed to:", await nftTier2.getAddress());
  console.log("NFT Tier 3 deployed to:", await nftTier3.getAddress());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
