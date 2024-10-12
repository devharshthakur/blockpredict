/**
 * @file blockchain.module.ts
 * 
 * @description
 * This file defines the BlockchainModule, a NestJS module that encapsulates all blockchain-related functionality.
 * It includes the BlockchainController for handling HTTP requests related to blockchain operations,
 * the BlockchainApiService for interacting with the blockchain API, and the PythonService for executing
 * Python scripts or services that are necessary for blockchain operations.
 * 
 * @module BlockchainModule
 */
import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainApiService } from './blockchain-api.service';
import { PythonService } from './python.service';

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainApiService, PythonService],
})
export class BlockchainModule {}
