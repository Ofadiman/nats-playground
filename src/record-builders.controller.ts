import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  NatsContext,
  NatsRecordBuilder,
  Payload,
} from '@nestjs/microservices';
import * as nats from 'nats';

const RECORD_BUILDERS_EVENT_PATTERN = 'log_header';

@Controller()
export class RecordBuildersController {
  constructor(@Inject('RECORD_BUILDERS') private clientProxy: ClientProxy) {}

  @Get(`record-builders`)
  public async recordBuilders() {
    const headers = nats.headers();
    headers.set('x-local', 'I am local header');

    const record = new NatsRecordBuilder('headers').setHeaders(headers).build();

    this.clientProxy.emit(RECORD_BUILDERS_EVENT_PATTERN, record);
  }

  @EventPattern(RECORD_BUILDERS_EVENT_PATTERN)
  public handleEvent(@Payload() data: string, @Ctx() context: NatsContext) {
    const headers = context.getHeaders();
    console.log(`Header set locally: ${headers.get('x-local')}`);
    console.log(`Header set globally ${headers.get('x-global')}`);
  }
}
