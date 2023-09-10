import { ethers } from 'hardhat';

async function main() {
  const natachi2 = await ethers.deployContract('Natachi2');

  await natachi2.waitForDeployment();

  console.log(`deployed to ${natachi2.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
