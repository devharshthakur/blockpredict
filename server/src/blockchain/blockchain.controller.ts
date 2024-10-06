import { Controller, Post, Body } from '@nestjs/common';
import { BlockchainApiService } from './blockchain-api.service';
import { PythonService } from './python.service';

/**
 * Controller for handling blockchain-related API endpoints.
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

    // Step 1: Fetch current weights from the blockchain service
    const weights = await this.blockchainApiService.getWeights();

    // Step 2: Run the Python script to get predictions
    const predictions = await this.pythonService.runPythonScript(
      model1Inputs,
      model2Inputs,
      weights,
    );

    // Step 3: Extract individual model predictions
    const { model1, model2, model3, finalPrediction } = predictions.predictions;

    // Step 4: Compare predictions with the actual event and update weights
    await this.updateWeights(
      { model1, model2, model3 },
      actualEvent,
      weights,
    );

    // Step 5: Fetch updated weights from the blockchain service
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

  /**
   * Updates weights on the blockchain based on model correctness.
   * @param predictions - Object containing model predictions.
   * @param actualEvent - The actual event outcome.
   * @param weights - Current weights from the blockchain.
   */
  private async updateWeights(
    predictions: { model1: number; model2: number; model3: number },
    actualEvent: number,
    weights: { model1: number; model2: number; model3: number },
  ): Promise<void> {
    // Increase or decrease weights based on correctness
    const models = ['model1', 'model2', 'model3'];
    for (const model of models) {
      const modelNumber = parseInt(model.replace('model', ''), 10);
      const prediction = predictions[model];
      const currentWeight = weights[model];

      if (prediction === actualEvent) {
        // Correct prediction: Increase weight by 0.05 (scaled by 100)
        await this.blockchainApiService.updateWeight(modelNumber, 5);
      } else {
        // Incorrect prediction: Decrease weight by 0.05 (scaled by 100)
        await this.blockchainApiService.updateWeight(modelNumber, -5);
      }
    }
  }
}
