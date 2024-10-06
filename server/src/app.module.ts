import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlockchainModule } from './blockchain/blockchain.module';
import { BlockchainApiService } from './blockchain/blockchain-api.service';

@Module({
  imports: [BlockchainModule],
  controllers: [AppController],
  providers: [AppService, BlockchainApiService],
})
export class AppModule {}
