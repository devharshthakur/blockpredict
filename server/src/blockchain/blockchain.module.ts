import { Module } from '@nestjs/common';
import { BlockchainController } from './blockchain.controller';
import { BlockchainApiService } from './blockchain-api.service';
import { PythonService } from './python.service';

@Module({
  controllers: [BlockchainController],
  providers: [BlockchainApiService, PythonService],
})
export class BlockchainModule {}
