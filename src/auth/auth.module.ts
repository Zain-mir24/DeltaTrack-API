import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Auth]), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
