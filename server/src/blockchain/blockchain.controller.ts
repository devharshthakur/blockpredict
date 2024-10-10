// server/src/blockchain/blockchain.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { BlockchainApiService } from './blockchain-api.service';
import { PythonService } from './python.service';

/**
 * Controller for handling blockchain-related API endpoints.
 * Handles incoming predictions, sends them to the blockchain, and fetches updated weights.
 */
@Controller('blockchain')
export class BlockchainController {
  constructor(
    private readonly blockchainApiService: BlockchainApiService,
    private readonly pythonService: PythonService,
  ) {}

  /**
   * POST /blockchain/run
   * Endpoint to run the prediction simulation.
   * @param body - The request body containing inputs and actual event.
   */
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
    const { model1, model2, model3, finalPrediction } = predictions.predictions;

    // Step 4: Send predictions and actual event to the blockchain for weight updates
    await this.blockchainApiService.updateWeights(
      model1,
      model2,
      model3,
      actualEvent,
    );

    // Step 5: Fetch updated weights from the blockchain
    const updatedWeights = await this.blockchainApiService.getWeights();

    // Return predictions and updated weights
    return {
      predictions: {
        model1,
        model2,
        model3,
        finalPrediction,
      },
      weights: updatedWeights,
    };
  }
}
