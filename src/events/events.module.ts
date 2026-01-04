import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ApplicationService } from 'src/application/application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/application/entities/application.entity';
import { ProjectKeyGuard } from 'src/guards/project-key.guard';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Event])],
  controllers: [EventsController],
  providers: [EventsService, ApplicationService, ProjectKeyGuard],
})
export class EventsModule {}
