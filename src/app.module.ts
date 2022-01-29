import { Module } from '@nestjs/common';
import { RequestReplyController } from './request-reply.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats-main:4222'],
        },
      },
    ]),
  ],
  controllers: [RequestReplyController],
})
export class AppModule {}
