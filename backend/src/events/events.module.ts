import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { IpfsModule } from 'src/ipfs/ipfs.module';

@Module({
  providers: [EventsGateway],
  imports: [IpfsModule],
})
export class EventsModule {}