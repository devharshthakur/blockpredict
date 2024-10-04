// blockchain/scripts/deploy.ts

import { ethers,artifacts } from 'hardhat';
import fs from 'fs';
import path from 'path';

async function main() {
  const NiftyITPrediction = await ethers.getContractFactory('NiftyITPrediction');
  const contract = await NiftyITPrediction.deploy();

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log('Contract deployed to:', contractAddress);

  // Save contract address and ABI in shared directory
  const sharedDir = path.resolve(__dirname, '../../shared');
  if (!fs.existsSync(sharedDir)) {
    fs.mkdirSync(sharedDir, { recursive: true });
  }

  // Save contract address
  fs.writeFileSync(
    path.join(sharedDir, 'contract-address.json'),
    JSON.stringify({ address: contractAddress }, null, 2),
  );

  // Save contract ABI
  const artifact = await artifacts.readArtifact('NiftyITPrediction');
  fs.writeFileSync(
    path.join(sharedDir, 'NiftyITPrediction.json'),
    JSON.stringify(artifact, null, 2),
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error deploying contract:', error);
    process.exit(1);
  });
