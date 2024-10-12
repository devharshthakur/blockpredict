// server/src/blockchain/blockchain-api.service.ts

/**
 * This service interacts with a blockchain smart contract to manage and update model weights.
 * 
 * Key functionalities include:
 * - Establishing a connection to a local Ethereum blockchain node using ethers.js.
 * - Creating a signer using a private key from environment variables.
 * - Interacting with a specific smart contract using its address and ABI.
 * 
 * The service provides the following methods:
 * 
 * 1. `getWeights`: Fetches the current weights of the models from the blockchain contract.
 *    - Returns an object containing the weights of three models.
 * 
 * 2. `resetWeights`: Resets the weights of the models on the blockchain contract.
 *    - Checks if the caller is the owner of the contract before resetting the weights.
 *    - Throws an error if the caller is not the owner.
 * 
 * 3. `processPredictions`: Sends model predictions and the actual event to the smart contract for weight updates.
 *    - Takes predictions from three models and the actual event outcome as parameters.
 *    - Sends these values to the smart contract to update the weights accordingly.
 */
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractABI from '../../../shared/NiftyITPrediction.json';
import * as contractAddress from '../../../shared/contract-address.json';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class BlockchainApiService {
  private provider = new ethers.JsonRpcProvider('http://localhost:8545');
  private signer = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    this.provider,
  );
  private contract = new ethers.Contract(
    contractAddress.address,
    contractABI.abi,
    this.signer,
  );

  /**
   * Fetches the current weights of the models from the blockchain contract.
   * @returns An object containing the weights of the models.
   */
  async getWeights(): Promise<{
    model1: number;
    model2: number;
    model3: number;
  }> {
    const [weight1, weight2, weight3] = await this.contract.getWeights();

    return {
      model1: Number(weight1),
      model2: Number(weight2),
      model3: Number(weight3),
    };
  }

  async resetWeights() {
    // Check if the caller is the owner
    const owner = await this.contract.owner();
    if (this.signer.address !== owner) {
      throw new Error('Caller is not the owner');
    }

    // Call the resetWeights function
    const tx = await this.contract.resetWeights();
    await tx.wait();
  }
  /**
   * Sends model predictions and the actual event to the smart contract for weight updates.
   * @param model1Prediction - Prediction of the first model.
   * @param model2Prediction - Prediction of the second model.
   * @param model3Prediction - Prediction of the third model.
   * @param actualEvent - The actual outcome to compare against.
   */
  async processPredictions(
    model1Prediction: number,
    model2Prediction: number,
    model3Prediction: number,
    actualEvent: number,
  ): Promise<void> {
    const tx = await this.contract.processPredictions(
      model1Prediction,
      model2Prediction,
      model3Prediction,
      actualEvent,
    );
    await tx.wait(); // Wait for the transaction to be confirmed
  }
}
