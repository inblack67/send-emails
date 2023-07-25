/* eslint-disable prettier/prettier */

import { DataSource } from 'typeorm';
import { EmailJob } from './EmailJob.entity';

export const emailJobProviders = [
  {
    provide: 'EMAILJOB_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(EmailJob),
    inject: ['DATA_SOURCE'],
  },
];
