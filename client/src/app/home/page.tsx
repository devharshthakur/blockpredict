/**
 * `ModelPrediction` renders the interface for running model predictions.
 *
 * Components:
 * - `Header`: Page header.
 * - `InputForm`: User input form.
 * - `OutputDisplay`: Shows prediction results.
 * - `JSONOutput`: Toggles JSON output display.
 * - `Button`: Triggers prediction.
 * - `BarChart2`: Icon on the button.
 *
 * State:
 * - `inputData`: Model input data.
 * - `outputData`: Prediction results.
 * - `isLoading`: Prediction running status.
 * - `showJsonOutput`: JSON output visibility.
 *
 * Handlers:
 * - `handleInputChange`: Updates input data.
 * - `handleActualEventChange`: Updates actual event value.
 * - `handleRun`: Simulates API call and updates output data.
 * - `toggleJsonOutput`: Toggles JSON output visibility.
 */
"use client";
import { useState } from "react";
import InputForm from "@/components/custom/homePage/inputForm";
import OutputDisplay from "@/components/custom/homePage/outputDisplay";
import JSONOutput from "@/components/custom/homePage/JSONOutput";
import Header from "@/components/custom/homePage/header";
import { InputData, OutputData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";
import { runModelPrediction } from "@/utils/api";

export default function ModelPrediction() {
  const [inputData, setInputData] = useState<InputData>({
    model1Inputs: {
      "Infosys net profit": 0,
      "Nifty change_profit": 0,
      "Nifty change_close": 0,
      "TCS change_profit": 0,
      "Infosys change_profit": 0,
      "HCL change_profit": 0,
      "Nifty change_sales": 0,
      "TCS change_sales": 0,
      "Infosys change_sales": 0,
      Last_close: 0,
    },
    model2Inputs: {
      nasdaq_close_percentage_change: 0,
      nifty_close_percentage_change: 0,
      nasdaq_open_percentage_change: 0,
      nifty_open_percentage_change: 0,
      nasdaq_high_percentage_change: 0,
      nifty_high_percentage_change: 0,
      nasdaq_low_percentage_change: 0,
      nifty_low_percentage_change: 0,
    },
    actualEvent: 0,
  });
  const [outputData, setOutputData] = useState<OutputData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showJsonOutput, setShowJsonOutput] = useState(false);

  const handleInputChange = (
    model: "model1Inputs" | "model2Inputs",
    field: string,
    value: string,
  ) => {
    setInputData((prev) => ({
      ...prev,
      [model]: {
        ...prev[model],
        [field]: parseFloat(value) || 0,
      },
    }));
  };
  const handleActualEventChange = (value: string) => {
    setInputData((prev) => ({
      ...prev,
      actualEvent: parseInt(value) || 0,
    }));
  };

  const handleRun = async () => {
    setIsLoading(true);
    try {
      const data = await runModelPrediction(inputData);
      setOutputData(data);
    } catch (error) {
      console.error("Failed to run prediction:", error);
    }
    setIsLoading(false);
  };

  const toggleJsonOutput = () => {
    setShowJsonOutput((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <InputForm
            inputData={inputData}
            handleInputChange={handleInputChange}
            handleActualEventChange={handleActualEventChange}
          />
          <div className="flex justify-end pt-6">
            <Button onClick={handleRun} disabled={isLoading}>
              {isLoading ? "Running..." : "Run"}
              <BarChart2 className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {outputData && (
            <>
              <OutputDisplay outputData={outputData} />
              <JSONOutput
                outputData={outputData}
                showJsonOutput={showJsonOutput}
                toggleJsonOutput={toggleJsonOutput}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
