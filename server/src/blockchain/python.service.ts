import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

/**
 * Python Service
 * 
 * This service is responsible for interacting with a Python script that performs model predictions.
 * 
 * Key Responsibilities:
 * 1. **Sending Inputs**: The service sends input data to the Python script. This data is typically required for making predictions.
 * 2. **Model Predictions**: The Python script utilizes pre-trained machine learning models to make predictions based on the input data.
 * 3. **Returning Predictions**: Once the Python script has made its predictions, the results are sent back to the backend. These predictions can then be used for further processing or decision-making within the application.
 * 
 * Usage:
 * - This service can be invoked whenever predictions from the machine learning models are needed.
 * - Ensure that the input data format is compatible with the Python script's requirements.
 * - Handle the returned predictions appropriately in the backend to integrate them into the application's workflow.
 * 
 * * 
 * Note:
 * - Ensure that the Python environment is correctly set up and that the required models are pre-trained and available.
 * - Proper error handling should be implemented to manage any issues during the interaction with the Python script.
 */
@Injectable()
export class PythonService {
  /**
   * Runs the Python script and returns the predictions.
   * @param model1Inputs - Inputs for the compVsnifty model.
   * @param model2Inputs - Inputs for the niftyVsnasdaq model.
   * @param weights - Current weights for the three models as received from the blockchain.
   * @returns A promise that resolves to the predictions from the Python script.
   */
  async runPythonScript(
    model1Inputs: any,
    model2Inputs: any,
    weights: { [key: string]: number },
  ): Promise<any> {
    // Return a new Promise to handle the asynchronous nature of the process
    return new Promise((resolve, reject) => {
      // Prepare input data as JSON
      const inputData = {
        model1Inputs, // Features for the first model (compVsnifty)
        model2Inputs, // Features for the second model (niftyVsnasdaq)
        weights: [weights.model1, weights.model2, weights.model3], // Array of weights for the three models.
      };

      // Log the input data for debugging purposes
      console.log('Sending input data to Python script:', inputData);

      // Spawn a new Python process to run the script
      const scriptPath = path.resolve(__dirname, '../../../predict/predict.py');
      const pythonExecutable = 'C:/Users/harsh/anaconda3/python.exe'; // path to your global python executable (imports in predict.py make sure should be installed in the same environment)
      const pythonProcess = spawn(pythonExecutable, [scriptPath]);
      // Prepare variables to capture the script's output and errors
      let dataString = '';
      let errorString = '';

      // Collect data from the script's stdout (standard output)
      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString(); // Append output data as it comes in.
      });

      // Collect error messages from the script's stderr (standard error)
      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString(); // Append error messages for debugging.
      });

      // Handle the close event of the Python process
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          // If the script did not exit successfully, log the error and reject the promise
          console.error(`Python script error: ${errorString}`);
          reject(new Error(`Python script exited with code ${code}`));
        } else {
          // Attempt to parse the Python script's output as JSON
          try {
            const predictions = JSON.parse(dataString); // Parse the JSON output from the script.
            console.log(
              'Received predictions from Python script:',
              predictions,
            ); // Log the predictions for debugging.
            resolve(predictions); // Resolve the promise with the parsed predictions.
          } catch (error) {
            console.error(`Error parsing Python script output: ${error}`); // Log parsing errors.
            reject(error); // Reject the promise with the parsing error.
          }
        }
      });

      // Send the input data JSON to the Python script via stdin (standard input)
      pythonProcess.stdin.write(JSON.stringify(inputData));
      pythonProcess.stdin.end(); // Close stdin to signal that no more input is coming.
    });
  }
}
