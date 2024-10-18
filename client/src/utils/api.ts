/**
 * @file /D:/COLLEGE PROJECTS/blockpredict/client/src/utils/api.ts
 *
 * This file contains utility functions for making API requests related to model predictions.
 * It uses Axios for HTTP requests and handles interactions with the backend API.
 */

import axios from "axios";
import { InputData } from "@/lib/types";
import { OutputData } from "@/lib/types";

export const runModelPrediction = async (
  inputData: InputData,
): Promise<OutputData> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/run`,
      inputData,
    );
    return response.data;
  } catch (error) {
    console.error("Error running model prediction:", error);
    throw error;
  }
};
