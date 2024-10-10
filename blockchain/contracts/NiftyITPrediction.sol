// NiftyITPrediction.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title NiftyITPrediction
 * @dev Manages weights for three prediction models and updates them based on accuracy.
 */
contract NiftyITPrediction {
    uint256 public weight1 = 100; // Weight for Model 1
    uint256 public weight2 = 100; // Weight for Model 2
    uint256 public weight3 = 100; // Weight for Model 3

    address public owner;

    event WeightsUpdated(uint256 weight1, uint256 weight2, uint256 weight3);
    event PredictionProcessed(uint256 model1, uint256 model2, uint256 model3, uint256 actualEvent);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Adjusts the model weights based on the comparison between model predictions and actual events.
     * @param model1 Prediction from Model 1.
     * @param model2 Prediction from Model 2.
     * @param model3 Prediction from Model 3.
     * @param actualEvent The actual outcome (0 or 1).
     */
    function processPredictions(uint256 model1, uint256 model2, uint256 model3, uint256 actualEvent) public onlyOwner {
        adjustWeight(model1, actualEvent, 1);
        adjustWeight(model2, actualEvent, 2);
        adjustWeight(model3, actualEvent, 3);

        emit PredictionProcessed(model1, model2, model3, actualEvent);
    }

    /**
     * @dev Adjusts the weight of a specific model.
     * @param prediction The model's prediction.
     * @param actualEvent The actual outcome.
     * @param modelNumber The model number (1, 2, or 3).
     */
    function adjustWeight(uint256 prediction, uint256 actualEvent, uint8 modelNumber) internal {
        if (prediction == actualEvent) {
            if (modelNumber == 1) weight1 += 5;
            else if (modelNumber == 2) weight2 += 5;
            else if (modelNumber == 3) weight3 += 5;
        } else {
            if (modelNumber == 1 && weight1 > 5) weight1 -= 5;
            else if (modelNumber == 2 && weight2 > 5) weight2 -= 5;
            else if (modelNumber == 3 && weight3 > 5) weight3 -= 5;
        }
        emit WeightsUpdated(weight1, weight2, weight3);
    }

    /**
     * @dev Returns the current weights of the models.
     */
    function getWeights() public view returns (uint256, uint256, uint256) {
        return (weight1, weight2, weight3);
    }
}
