/**
 * Interface representing the weights of each model from the blockchain.
 */
export interface ModelWeights {
  model1: number;
  model2: number;
  model3: number;
}

/**
 * Interface representing the payload for updating model weights.
 */
export interface UpdateWeightPayload {
  modelNumber: number;
  amount: number;
}
