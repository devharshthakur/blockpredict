/**
 * @file checkOwner.js
 * @description This script connects to an Ethereum smart contract and retrieves the owner's address.
 * It uses the ethers.js library to interact with the blockchain and dotenv to manage environment variables.
 * The script initializes a provider and a contract instance, then calls the owner function of the contract.
 * The owner's address is logged to the console. If an error occurs during the process, it is caught and logged.
 * 
 * Environment Variables:
 * - RPC_URL: The URL of the Ethereum JSON-RPC provider.
 * 
 * Dependencies:
 * - ethers: A library for interacting with the Ethereum blockchain.
 * - dotenv: A module to load environment variables from a .env file.
 */
const { ethers } = require('ethers');
require('dotenv').config({ path: '../.env' });

// Load environment variables
const RPC_URL = process.env.RPC_URL;
const CONTRACT_ADDRESS = require('../shared/contract-address.json').address;
const CONTRACT_ABI = require('../shared/NiftyITPrediction.json').abi;

// Initialize provider and contract
const provider = new ethers.JsonRpcProvider(RPC_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

async function checkOwner() {
  try {
    // Call the owner function of the contract
    const owner = await contract.owner();
    console.log(`Owner address: ${owner}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

checkOwner();