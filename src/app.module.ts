import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...typeOrmConfig, autoLoadEntities: false }),
    EventsModule,
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user:  process.env.EMAIL,
          pass:process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from:  process.env.EMAIL,
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
