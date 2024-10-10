/**
 * Interface representing the predictions from each model.
 */
export interface ModelPredictions {
  model1: number;
  model2: number;
  model3: number;
  finalPrediction: number;
}

/**
 * Interface representing the body of the request to the `/blockchain/run` endpoint.
 */
export interface PredictionRequestBody {
  model1Inputs: any; // Replace `any` with a more specific type if you have it
  model2Inputs: any; // Replace `any` with a more specific type if you have it
  actualEvent: number;
}
