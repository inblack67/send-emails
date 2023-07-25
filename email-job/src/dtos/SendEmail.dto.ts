/* eslint-disable prettier/prettier */
export class SendEmailsDto {
  count: number;
}

export class SendEmailsResDto {
  jobId: string;
}

export class EmailJobDto {
  jobId: string;
  count: number;
  current: number;
}

export class EmailJobUpdateDto {
  jobId: string;
  sentSoFar: number;
}
