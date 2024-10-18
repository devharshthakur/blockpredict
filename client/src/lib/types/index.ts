/**
 * @file This file contains type definitions for input and output data structures used in the blockpredict client application.
 */
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

export interface TeamMember {
  name: string;
  responsibility: string;
  subject: string;
  image: string;
  Github: string;
}

export interface Tech {
  icon: string;
  name: string;
  category: string;
}

export interface Technology {
  name: string;
  icon: string;
  category: string;
}
