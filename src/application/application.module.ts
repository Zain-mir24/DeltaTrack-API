import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), UsersModule],
  controllers: [ApplicationController],
  providers: [ApplicationService, JwtAuthGuard],
  exports: [ApplicationService], // Export service so other modules can use it (e.g., for project key validation)
})
export class ApplicationModule {}
