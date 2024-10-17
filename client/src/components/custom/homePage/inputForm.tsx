// components/InputForm.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart2 } from "lucide-react";
import { InputData } from "@/lib/types";

type InputFormProps = {
  onRun: (inputData: InputData) => void;
  isLoading: boolean;
};

export default function InputForm({ onRun, isLoading }: InputFormProps) {
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

  const handleRunClick = () => {
    onRun(inputData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Input Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="model1" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="model1">Model 1 Inputs</TabsTrigger>
            <TabsTrigger value="model2">Model 2 Inputs</TabsTrigger>
          </TabsList>
          <TabsContent value="model1">
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(inputData.model1Inputs).map(([key, value]) => (
                <div key={key}>
                  <Label
                    htmlFor={`model1-${key}`}
                    className="text-sm font-medium"
                  >
                    {key}
                  </Label>
                  <Input
                    id={`model1-${key}`}
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleInputChange("model1Inputs", key, e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="model2">
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(inputData.model2Inputs).map(([key, value]) => (
                <div key={key}>
                  <Label
                    htmlFor={`model2-${key}`}
                    className="text-sm font-medium"
                  >
                    {key}
                  </Label>
                  <Input
                    id={`model2-${key}`}
                    type="number"
                    value={value}
                    onChange={(e) =>
                      handleInputChange("model2Inputs", key, e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-6">
          <Label htmlFor="actualEvent" className="text-sm font-medium">
            Actual Event
          </Label>
          <Input
            id="actualEvent"
            type="number"
            value={inputData.actualEvent}
            onChange={(e) => handleActualEventChange(e.target.value)}
            className="mt-1"
          />
        </div>
      </CardContent>
      <CardContent className="flex justify-end pt-6">
        <Button onClick={handleRunClick} disabled={isLoading}>
          {isLoading ? "Running..." : "Run"}
          <BarChart2 className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
