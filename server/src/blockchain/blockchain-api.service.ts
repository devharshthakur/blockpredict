import { Injectable } from '@nestjs/common';
import axios from 'axios';

/**
 * Service to communicate with the blockchain service via HTTP requests.
 */
@Injectable()
export class BlockchainApiService {
  private blockchainServiceUrl = 'http://localhost:4000/blockchain';

  /**
   * Fetches the current model weights from the blockchain service.
   * @returns An object containing the weights of the models.
   */
  async getWeights(): Promise<{ [key: string]: number }> {
    const response = await axios.get(`${this.blockchainServiceUrl}/weights`);
    return response.data;
  }

  /**
   * Updates the weight of a specific model on the blockchain.
   * @param modelNumber - The model number to update (1, 2, or 3).
   * @param amount - The amount to adjust the weight by (scaled by 100).
   */
  async updateWeight(modelNumber: number, amount: number): Promise<void> {
    await axios.post(`${this.blockchainServiceUrl}/update-weight`, {
      modelNumber,
      amount,
    });
  }
}
