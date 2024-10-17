// types/index.ts

export type InputData = {
  model1Inputs: Record<string, number>;
  model2Inputs: Record<string, number>;
  actualEvent: number;
};

export type OutputData = {
  predictions: {
    model1: number;
    model2: number;
    model3: number;
    finalPrediction: number;
  };
  weights: {
    model1: number;
    model2: number;
    model3: number;
  };
};
