// server/src/blockchain/blockchain.controller.ts
/**
 * This file defines a controller for handling blockchain-related API endpoints.
 *
 * The primary responsibilities of this controller include:
 * 1. Receiving incoming predictions from clients.
 * 2. Sending these predictions to the blockchain for processing.
 * 3. Fetching updated weights from the blockchain and returning them to the clients.
 *
 * This controller acts as an intermediary between the client applications and the blockchain,
 * ensuring that predictions are properly handled and the latest data is retrieved.
 */

import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlockchainApiService } from './blockchain-api.service';
import { PythonService } from './python.service';

@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly blockchainApiService: BlockchainApiService,
    private readonly pythonService: PythonService,
  ) {}

  @Get('get-weights')
  async getWeights() {
    const weights = await this.blockchainApiService.getWeights();
    return weights;
  }

  @Post('reset-weights')
  async resetWeights() {
    try {
      await this.blockchainApiService.resetWeights();
      return { message: 'Weights reset successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('run')
  async runSimulation(@Body() body: any) {
    const { model1Inputs, model2Inputs, actualEvent } = body;

    // Step 1: Fetch current weights from the blockchain
    const weights = await this.blockchainApiService.getWeights();

    // Step 2: Run the Python script to get predictions
    const predictions = await this.pythonService.runPythonScript(
      model1Inputs,
      model2Inputs,
      weights,
    );

    // Step 3: Extract individual model predictions
    const { model1, model2, model3 } = predictions.predictions;

    // Step 4: Send predictions and actual event to the blockchain for weight updates
    await this.blockchainApiService.processPredictions(
      model1,
      model2,
      model3,
      actualEvent,
    );

    // Step 5: Fetch updated weights from the blockchain
    const updatedWeights = await this.blockchainApiService.getWeights();

    return {
      predictions: { model1, model2, model3 },
      weights: updatedWeights,
    };
  }
}
