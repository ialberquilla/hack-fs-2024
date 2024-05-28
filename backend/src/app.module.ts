import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import constants from 'src/shared/constants';
import { ConfigModule } from '@nestjs/config';
import { IpfsService } from './ipfs/ipfs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [constants],
    }),
    EventsModule
  ],
  providers: [IpfsService],
})
export class AppModule {}