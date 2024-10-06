// blockchain-service/src/blockchain/blockchain.service.ts

import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Service to interact with the blockchain and smart contract.
 */
@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor() {
    this.initializeContract();
  }

  /**
   * Initializes the contract by reading ABI and connecting to the provider.
   */
  private async initializeContract() {
    // Read contract address and ABI
    const contractAddressPath = path.resolve(
      __dirname,
      '../../../shared/contract-address.json',
    );
    const contractAddress = JSON.parse(
      fs.readFileSync(contractAddressPath, 'utf8'),
    ).address;

    const contractAbiPath = path.resolve(
      __dirname,
      '../../../shared/NiftyITPrediction.json',
    );
    const contractAbi = JSON.parse(
      fs.readFileSync(contractAbiPath, 'utf8'),
    ).abi;

    // Connect to local blockchain provider
    this.provider = new ethers.JsonRpcProvider('http://localhost:8545');
    this.signer = await this.provider.getSigner();

    // Create contract instance
    this.contract = new ethers.Contract(
      contractAddress,
      contractAbi,
      this.signer,
    );
  }

  /**
   * Retrieves the current weights from the smart contract.
   * @returns An object containing the weights.
   */
  async getWeights(): Promise<{ [key: string]: number }> {
    const weights = await this.contract.getWeights();
    return {
      model1: Number(weights[0]) / 100,
      model2: Number(weights[1]) / 100,
      model3: Number(weights[2]) / 100,
    };
  }

  /**
   * Updates the weight of a specific model on the smart contract.
   * @param modelNumber - The model number to update (1, 2, or 3).
   * @param amount - The amount to adjust the weight by (scaled by 100).
   */
  async updateWeight(modelNumber: number, amount: number): Promise<void> {
    const tx = await this.contract.updateWeight(modelNumber, amount);
    await tx.wait(); // Wait for the transaction to be mined
  }
}
