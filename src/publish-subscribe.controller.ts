import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { timeout } from 'rxjs';

const PUBLISH_SUBSCRIBE_EVENT_PATTERN = 'request_send';

@Controller()
export class PublishSubscribeController {
  constructor(@Inject('PUBLISH_SUBSCRIBE') private clientProxy: ClientProxy) {}

  @Post('publish-subscribe')
  public publishSubscribe(@Body() body: { name: string }) {
    this.clientProxy
      .emit(PUBLISH_SUBSCRIBE_EVENT_PATTERN, body)
      .pipe(timeout(1_000));
  }

  @EventPattern(PUBLISH_SUBSCRIBE_EVENT_PATTERN)
  public handleEvent(data: { name: string }) {
    console.log(`Handling emitted event.`);
    console.log(data);
  }
}
