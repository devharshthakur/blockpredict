import { Controller, Get, Post, Body } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';

/**
 * Controller for blockchain API endpoints.
 */
@Controller('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  /**
   * GET /blockchain/weights
   * Fetches the current model weights.
   */
  @Get('weights')
  async getWeights() {
    return await this.blockchainService.getWeights();
  }

  /**
   * POST /blockchain/update-weight
   * Updates the weight of a specific model.
   * @param body - Contains modelNumber and amount.
   */
  @Post('update-weight')
  async updateWeight(@Body() body: { modelNumber: number; amount: number }) {
    const { modelNumber, amount } = body;
    await this.blockchainService.updateWeight(modelNumber, amount);
    return { message: 'Weight updated successfully' };
  }
}
