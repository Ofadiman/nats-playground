import { Module } from '@nestjs/common';
import { RequestReplyController } from './request-reply.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PublishSubscribeController } from './publish-subscribe.controller';
import { RecordBuildersController } from './record-builders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REQUEST_REPLY',
        transport: Transport.NATS,
        options: {
          servers: ['n1.example.net:4222'],
          queue: 'REQUEST_REPLY_QUEUE',
        },
      },
      {
        name: 'PUBLISH_SUBSCRIBE',
        transport: Transport.NATS,
        options: {
          servers: ['n1.example.net:4222'],
          queue: 'PUBLISH_SUBSCRIBE_QUEUE',
        },
      },
      {
        name: 'RECORD_BUILDERS',
        transport: Transport.NATS,
        options: {
          servers: ['n1.example.net:4222'],
          headers: { 'x-global': 'I am global header' },
          queue: 'RECORD_BUILDERS_QUEUE',
        },
      },
    ]),
  ],
  controllers: [
    RequestReplyController,
    PublishSubscribeController,
    RecordBuildersController,
  ],
})
export class AppModule {}
