// pages/index.tsx

"use client";

import InputForm from "@/components/custom/homePage/inputForm";
import OutputCard from "@/components/custom/homePage/outputCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputData, OutputData } from "@/lib/types";
import axios from "axios";

export default function ModelPrediction() {
  const [outputData, setOutputData] = useState<OutputData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunSimulation = async (inputData: InputData) => {
    setIsLoading(true);
    try {
    // Make API call to /blockchain/run endpoint using axios
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/run`, inputData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

      if (response.status !== 200) {
        throw new Error("Failed to fetch prediction results.");
      }

      const data: OutputData = response.data;
      setOutputData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Model Prediction</h1>
          <Button variant="outline" asChild>
            <a href="/about">About</a>
          </Button>
        </div>
      </header>
      <main className="container mx-auto flex-grow px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <InputForm onRun={handleRunSimulation} isLoading={isLoading} />
          {outputData && <OutputCard outputData={outputData} />}
        </div>
      </main>
    </div>
  );
}
