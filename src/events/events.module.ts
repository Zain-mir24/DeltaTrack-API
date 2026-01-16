import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ApplicationService } from '../application/application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from '../application/entities/application.entity';
import { ProjectKeyGuard } from '../guards/project-key.guard';
import { Event } from './entities/event.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Event,User])],
  controllers: [EventsController],
  providers: [EventsService, ApplicationService, ProjectKeyGuard,JwtAuthGuard,UsersService],
})
export class EventsModule {}
