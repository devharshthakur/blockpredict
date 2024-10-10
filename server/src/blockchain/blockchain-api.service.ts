// server/src/blockchain/blockchain-api.service.ts

import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractABI from '../../shared/abi/NiftyITPrediction.json';
import * as contractAddress from '../../shared/contract-address.json';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Service to interact with the NiftyITPrediction smart contract using ethers.js.
 * This service sends predictions and actual events to the smart contract, which handles weight updates.
 */
@Injectable()
export class BlockchainApiService {
  private provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545');
  private signer = new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    this.provider,
  );
  private contract = new ethers.Contract(
    contractAddress.NiftyITPrediction,
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
    const weight1 = await this.contract.weight1();
    const weight2 = await this.contract.weight2();
    const weight3 = await this.contract.weight3();

    return {
      model1: weight1.toNumber(),
      model2: weight2.toNumber(),
      model3: weight3.toNumber(),
    };
  }

  /**
   * Sends model predictions and the actual event to the smart contract for weight updates.
   * @param model1Prediction - Prediction of the first model.
   * @param model2Prediction - Prediction of the second model.
   * @param model3Prediction - Prediction of the third model.
   * @param actualEvent - The actual outcome to compare against.
   */
  async updateWeights(
    model1Prediction: number,
    model2Prediction: number,
    model3Prediction: number,
    actualEvent: number,
  ): Promise<void> {
    const tx = await this.contract.updateWeights(
      model1Prediction,
      model2Prediction,
      model3Prediction,
      actualEvent,
    );
    await tx.wait(); // Wait for the transaction to be confirmed
  }
}
