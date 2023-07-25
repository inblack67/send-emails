export class SendEmailsDto {
  count: number;
}

export class SendEmailsResDto {
  jobId: number;
}

export class EmailJobDto {
  jobId: number;
  count: number;
  current: number;
}

export class EmailJobUpdateDto {
  jobId: number;
  sentSoFar: number;
}
