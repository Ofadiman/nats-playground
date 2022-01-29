import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { timeout } from 'rxjs';

const REQUEST_REPLY_MESSAGE_PATTERN = { cmd: 'sum' };

@Controller()
export class RequestReplyController {
  constructor(@Inject('REQUEST_REPLY') private clientProxy: ClientProxy) {}

  @Post('request-reply')
  public async requestReply(@Body() body: { items: string[] }) {
    return this.clientProxy
      .send<number>(REQUEST_REPLY_MESSAGE_PATTERN, body.items)
      .pipe(timeout(1_000));
  }

  @MessagePattern(REQUEST_REPLY_MESSAGE_PATTERN, Transport.NATS)
  public async sum(@Payload() payload: number[], @Ctx() _context: NatsContext) {
    return payload.reduce((accumulator, value) => {
      return accumulator + Number(value);
    }, 0);
  }
}
