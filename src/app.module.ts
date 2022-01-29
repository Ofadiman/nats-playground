import { Module } from '@nestjs/common';
import { RequestReplyController } from './request-reply.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublishSubscribeController } from './publish-subscribe.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REQUEST_REPLY',
        transport: Transport.NATS,
        options: {
          servers: ['n1.example.net:4222'],
        },
      },
      {
        name: 'PUBLISH_SUBSCRIBE',
        transport: Transport.NATS,
        options: {
          servers: ['n1.example.net:4222'],
        },
      },
    ]),
  ],
  controllers: [RequestReplyController, PublishSubscribeController],
})
export class AppModule {}
