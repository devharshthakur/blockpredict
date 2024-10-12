# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```

Please note the contract address. It would look like 
```
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
Your terminal will have something similar to this
```shell
user@machine MINGW64 /d/COLLEGE PROJECTS/blockpredict/blockchain (main)
$ pnpm hardhat run scripts/deploy.ts --network localhost
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

To check the owner address and contract address from the log, you can use the following commands:

```shell
npx hardhat run scripts/checkOwner.js
npx hardhat run scripts/checkContractAddress.js
```