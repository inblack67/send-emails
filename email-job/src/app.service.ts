import { Injectable, Inject } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import {
  EmailJobDto,
  SendEmailsDto,
  SendEmailsResDto,
} from './dtos/SendEmail.dto';
import { Message } from 'kafkajs';
import { Repository } from 'typeorm';
import { EmailJob } from './db/EmailJob.entity';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService,
    @Inject('EMAILJOB_REPOSITORY')
    private emailJobRepo: Repository<EmailJob>,
  ) {}

  async sendEmails(dto: SendEmailsDto): Promise<SendEmailsResDto> {
    const res = await this.emailJobRepo.save({
      emailCount: dto.count,
    });

    const jobId = res.id.toString();

    const messages: Message[] = [];

    for (let I = 1; I <= dto.count; I++) {
      const payload: EmailJobDto = { count: dto.count, jobId, current: I };
      messages.push({
        value: JSON.stringify(payload),
      });
    }

    await this.producerService.produce({
      topic: 'email',
      messages,
    });

    return {
      jobId,
    };
  }

  async getAllJobs(): Promise<EmailJob[]> {
    return await this.emailJobRepo.find();
  }
}
