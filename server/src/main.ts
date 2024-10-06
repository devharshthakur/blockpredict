import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Bootstraps the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for cross-origin requests
  await app.listen(3001); // Backend server listens on port 3001
  console.log('Backend server is running on http://localhost:3001');
}
bootstrap();
