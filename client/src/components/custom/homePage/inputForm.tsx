/**
 * @file inputForm.tsx
 * @description This file contains the `InputForm` component, which is used to render input fields for two different models and an actual event input. It utilizes the `Tabs` component to switch between input fields for Model 1 and Model 2.
 *
 * @component
 * @param {InputData} inputData - The input data for the form, including inputs for Model 1, Model 2, and the actual event.
 * @param {function} handleInputChange - Callback function to handle changes in the input fields for Model 1 and Model 2.
 * @param {function} handleActualEventChange - Callback function to handle changes in the actual event input field.
 *
 * @returns {JSX.Element} The rendered `InputForm` component.
 */
import { InputData } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InputFormProps = {
  inputData: InputData;
  handleInputChange: (
    model: "model1Inputs" | "model2Inputs",
    field: string,
    value: string,
  ) => void;
  handleActualEventChange: (value: string) => void;
};

export default function InputForm({
  inputData,
  handleInputChange,
  handleActualEventChange,
}: InputFormProps) {
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
    </Card>
  );
}
