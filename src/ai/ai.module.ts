import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { EventsService } from '../events/events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { UsersModule } from '../users/users.module';
@Module({
  imports: [TypeOrmModule.forFeature([Event]),UsersModule],
  controllers: [AiController],
  providers: [AiService,EventsService],
})
export class AiModule {}
