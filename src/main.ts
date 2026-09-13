import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  
  });

  // Enable global validation pipe for request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO-তে যেসব property define করা নেই, সেগুলো remove করে দেওয়া।
      forbidNonWhitelisted: true, // DTO-তে নেই এমন property পেলে silently remove করবে না; বরং 400 Bad Request error দেবে।
    })
  );

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
