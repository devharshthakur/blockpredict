// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract NiftyITPrediction {
    // Weights for each model, scaled by 100 to handle decimals
    uint256 public weight1 = 100; // Represents 1.00
    uint256 public weight2 = 100; // Represents 1.00
    uint256 public weight3 = 100; // Represents 1.00

    address public owner;

    // Event emitted when weights are updated
    event WeightsUpdated(uint256 weight1, uint256 weight2, uint256 weight3);

    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict functions to the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Function to retrieve the current weights
    function getWeights() public view returns (uint256, uint256, uint256) {
        return (weight1, weight2, weight3);
    }

    // Function to update the weight of a specific model
    function updateWeight(uint8 modelNumber, uint256 amount) public onlyOwner {
        require(modelNumber >= 1 && modelNumber <= 3, "Invalid model number");
        if (modelNumber == 1) {
            weight1 += amount;
        } else if (modelNumber == 2) {
            weight2 += amount;
        } else if (modelNumber == 3) {
            weight3 += amount;
        }
        emit WeightsUpdated(weight1, weight2, weight3);
    }
}
