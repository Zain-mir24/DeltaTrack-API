import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports :[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtAuthGuard],
  exports: [UsersService], // Export UsersService so guards can use it
})
export class UsersModule {}
