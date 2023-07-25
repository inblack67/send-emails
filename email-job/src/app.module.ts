import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { EmailConsumer } from './email.consumer';
import { DBModule } from './db/db.module';
import { emailJobProviders } from './db/EmailJob.providers';
import { WebsocketGW } from './websocket.gateway';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [KafkaModule, DBModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, EmailConsumer, ...emailJobProviders, WebsocketGW],
})
export class AppModule {}
