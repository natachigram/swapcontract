import { ethers } from 'hardhat';

async function main() {

  const natachi1TokenAddr = '0xe5c7090313592103Af5412DCbfE36226a82e15FD';
  const natachi2TokenAddr = '0x39d564E348Aa6e1C9EbFd1adE23724D4bB9A1E6d';
  const addressTo = '0x59d67cb811d7F338677059a0DF1a070C065e67Bc';
  const numbersOfTokens = ethers.parseEther("20");

  //connect to tokens contract 
  const natachi1Token = await ethers.getContractAt(
    'INatachi',
    natachi1TokenAddr
  );
  const natachi2Token = await ethers.getContractAt(
    'INatachi',
    natachi2TokenAddr
  );

  // mint tokens to address 

  await natachi1Token.mint(addressTo, numbersOfTokens);
  await natachi2Token.mint(addressTo, numbersOfTokens);
  

    

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
