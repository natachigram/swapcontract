import { ethers } from 'hardhat';

async function main() {

  const natachi1 = await ethers.deployContract('Natachi1');

  await natachi1.waitForDeployment();

  console.log(
    `deployed to ${natachi1.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
