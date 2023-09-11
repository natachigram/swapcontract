import { ethers } from 'hardhat';

async function main() {
  const natachi1TokenAddr = '0xe5c7090313592103Af5412DCbfE36226a82e15FD';
  const natachi2TokenAddr = '0x39d564E348Aa6e1C9EbFd1adE23724D4bB9A1E6d';

  const nSwap = await ethers.deployContract('Nswap', [
    natachi1TokenAddr,
    natachi2TokenAddr,
  ]);

  await nSwap.waitForDeployment();

  console.log(`deployed to ${nSwap.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
