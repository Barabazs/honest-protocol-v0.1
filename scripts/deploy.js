// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

const main = async () => {
  // gets info of the account used to deploy
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log('Deploying contract with account: ', deployer.address);
  console.log('Account balance: ', accountBalance.toString());

  // read contract file
  const LabelContract = await hre.ethers.getContractFactory(
    'LabelContract.sol'
  );
  // triggers deployment
  const label = await LabelContract.deploy({});

  // wait for deployment to finish
  await label.deployed();

  console.log('lablecontract contract address: ', label.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
