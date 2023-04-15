import { Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'wallet-balance',
        brokers: [process.env.KAFKA_HOST],
      },
      consumer: {
        groupId: 'my-consumer-' + Math.random(),
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3333);
}

bootstrap();
