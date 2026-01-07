import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Application } from 'src/application/entities/application.entity';

@Module({
  imports :[TypeOrmModule.forFeature([User,Application])],
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard],
  exports: [UsersService], // Export UsersService so guards can use it
})
export class UsersModule {}
