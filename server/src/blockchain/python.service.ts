import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';

/**
 * Service to run the Python script for model predictions.
 */
@Injectable()
export class PythonService {
  /**
   * Runs the Python script and returns the predictions.
   * @param model1Inputs - Inputs for the compVsnifty model.
   * @param model2Inputs - Inputs for the niftyVsnasdaq model.
   * @param weights - Current weights from the blockchain.
   * @returns The predictions from the Python script.
   */
  async runPythonScript(
    model1Inputs: any,
    model2Inputs: any,
    weights: { [key: string]: number },
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      // Prepare input data as JSON
      const inputData = {
        model1Inputs,
        model2Inputs,
        newsArticles: [
          // You can replace these with actual scraped news articles
          'Nifty falls short of its targets by a lot',
          'Once held by Quant MF, this small cap stock is up 20% and here is why',
          'PNB stock slips 2.5% after QIP launched at discounted price',
        ],
        weights: [weights.model1, weights.model2, weights.model3],
      };

      // Spawn a new Python process
      const pythonProcess = spawn('python', [
        path.join(__dirname, 'predict.py'),
      ]);

      let dataString = '';
      let errorString = '';

      // Collect data from stdout
      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      // Collect errors from stderr
      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      // Handle process close event
      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Python script error: ${errorString}`);
          reject(new Error(`Python script exited with code ${code}`));
        } else {
          try {
            const predictions = JSON.parse(dataString);
            resolve(predictions);
          } catch (error) {
            console.error(`Error parsing Python script output: ${error}`);
            reject(error);
          }
        }
      });

      // Send input data to the Python script via stdin
      pythonProcess.stdin.write(JSON.stringify(inputData));
      pythonProcess.stdin.end();
    });
  }
}
