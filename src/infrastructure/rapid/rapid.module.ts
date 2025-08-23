import { Module } from '@nestjs/common';
import { RapidApi } from './api/rapid.api';
import { RadpidRepository } from './rapid.repository';

@Module({
  providers: [RapidApi, RadpidRepository],
  exports: [RapidApi],
})
export class RapidModule {}
