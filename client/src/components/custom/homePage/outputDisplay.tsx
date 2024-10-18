/**
 * @file outputDisplay.tsx
 * @description This file contains the `OutputDisplay` component, which is responsible for rendering the prediction results and model weights in a card layout. The component takes `outputData` as a prop, which includes predictions and weights from different models.
 *
 * The component displays:
 * - Model Predictions: A card showing the predictions from different models.
 * - Final Prediction: A card showing the final prediction based on the model predictions.
 * - Model Weights: A card showing the weights of each model used in the final prediction.
 * - Interpretation Note: A note explaining the interpretation of the final prediction and model weights.
 *
 * The component uses various UI elements from the `@/components/ui/card` library and icons from the `lucide-react` library to enhance the visual representation of the data.
 *
 * @module OutputDisplay
 * @param {OutputDisplayProps} props - The props for the `OutputDisplay` component.
 * @param {OutputData} props.outputData - The data containing model predictions and weights.
 * @returns {JSX.Element} The rendered `OutputDisplay` component.
 */
import { OutputData } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

type OutputDisplayProps = {
  outputData: OutputData;
};

export default function OutputDisplay({ outputData }: OutputDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Prediction Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Model Predictions</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(outputData.predictions).map(
                  ([model, prediction]) => (
                    <Card key={model} className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          {model}
                        </span>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${prediction === 1 ? "bg-green-100" : "bg-red-100"}`}
                        >
                          {prediction === 1 ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                      <p className="mt-2 text-2xl font-bold">{prediction}</p>
                    </Card>
                  ),
                )}
              </div>
            </div>
            <Card className="p-4">
              <h4 className="text-md mb-2 font-semibold">Final Prediction</h4>
              <div className="flex items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${outputData.predictions.finalPrediction === 1 ? "bg-green-100" : "bg-red-100"} mr-4`}
                >
                  {outputData.predictions.finalPrediction === 1 ? (
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                </div>
                <span className="text-3xl font-bold">
                  {outputData.predictions.finalPrediction}
                </span>
              </div>
            </Card>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Model Weights</h3>
            <div className="space-y-4">
              {Object.entries(outputData.weights).map(([model, weight]) => (
                <Card key={model} className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">
                      {model}
                    </span>
                    <span className="text-sm font-bold">{weight}</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-blue-600"
                      style={{ width: `${(weight / 105) * 100}%` }}
                    ></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
            <h4 className="text-sm font-semibold text-yellow-800">
              Interpretation Note
            </h4>
          </div>
          <p className="mt-2 text-sm text-yellow-700">
            The final prediction is based on a weighted average of individual
            model predictions. A value of 1 indicates a positive prediction,
            while 0 indicates a negative prediction. Model weights represent the
            relative importance of each model in the final prediction.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
