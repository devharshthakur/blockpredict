/**
 * @file JSONOutput.tsx
 * @description This file contains the JSONOutput component, which is responsible for displaying JSON data in a formatted manner.
 * The component includes a button to toggle the visibility of the JSON output.
 *
 * @component
 * JSONOutput
 *
 * @prop {OutputData} outputData - The data to be displayed in JSON format.
 * @prop {boolean} showJsonOutput - A flag to determine whether the JSON output should be shown or hidden.
 * @prop {() => void} toggleJsonOutput - A function to toggle the visibility of the JSON output.
 *
 * @imports
 * - OutputData from "@/lib/types"
 * - Card, CardHeader, CardTitle, CardContent from "@/components/ui/card"
 * - Code from "lucide-react"
 *
 * @remarks
 * This component uses Tailwind CSS for styling and the lucide-react library for icons.
 */
import { OutputData } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";

type JSONOutputProps = {
  outputData: OutputData;
  showJsonOutput: boolean;
  toggleJsonOutput: () => void;
};

export default function JSONOutput({
  outputData,
  showJsonOutput,
  toggleJsonOutput,
}: JSONOutputProps) {
  return (
    <div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={toggleJsonOutput}
          className="rounded-md bg-gray-100 p-2 outline-none focus:outline-none"
        >
          {showJsonOutput ? "Hide" : "Show"} JSON Output
          <Code className="ml-2 h-4 w-4" />
        </button>
      </div>
      {showJsonOutput && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-2xl">JSON Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>{JSON.stringify(outputData, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
