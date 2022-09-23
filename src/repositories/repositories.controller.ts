import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RepositoriesService } from './repositories.service';
@ApiTags('Repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private service: RepositoriesService) {}

  @Get('/exercise-1')
  mock(): { repositories: { id: number; state: number }[] } {
    return this.service.mock();
  }
}
