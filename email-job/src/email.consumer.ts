/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ConsumerService } from './kafka/consumer.service';
import { EmailJobDto } from './dtos/SendEmail.dto';
import { EmailJob } from './db/EmailJob.entity';
import { WebSocketServer } from '@nestjs/websockets';
import { WebsocketGW } from './websocket.gateway';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private readonly webSocketGW: WebsocketGW,
    @Inject('EMAILJOB_REPOSITORY')
    private emailJobRepo: Repository<EmailJob>,
  ) {}

  @WebSocketServer()
  socket;

  async onModuleInit() {
    this.consumerService.consume(
      { topics: ['email'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          const payload: EmailJobDto = JSON.parse(message.value.toString());

          console.log({
            topic: topic.toString(),
            partition: partition,
            payload,
          });

          await this.sendEmail(+process.env.MILLIS_PER_EMAIL);

          await this.emailJobRepo.update(
            { id: +payload.jobId },
            {
              sentEmails: payload.current,
            },
          );

          this.webSocketGW.socket.emit('email-job', {
            jobId: payload.jobId,
            sentSoFar: payload.current,
          });
          console.log(`email sent.`);
        },
      },
    );
  }

  async sendEmail(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }
}
