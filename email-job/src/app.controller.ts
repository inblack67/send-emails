import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailsDto, SendEmailsResDto } from './dtos/SendEmail.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/send-emails')
  async sendEmails(@Body() dto: SendEmailsDto): Promise<SendEmailsResDto> {
    return await this.appService.sendEmails(dto);
  }

  @Get('/email-jobs')
  async getAllJobs() {
    return await this.appService.getAllJobs();
  }
}
