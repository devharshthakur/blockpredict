import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for cross-origin requests
  await app.listen(4000); // Blockchain service listens on port 4000
  console.log('Blockchain service is running on http://localhost:4000');
}
bootstrap();
