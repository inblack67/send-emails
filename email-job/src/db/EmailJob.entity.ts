/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'email_jobs' })
export class EmailJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'email_count' })
  emailCount: number;

  @Column({ type: 'int', name: 'sent_emails', default: 0 })
  sentEmails: number;
}
