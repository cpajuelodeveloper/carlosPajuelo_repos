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
import { Repository } from './repository.entity';
import { CreateRepositoryDto } from './dto/create-repository.dto';
@ApiTags('Repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private service: RepositoriesService) {}

  @Get()
  async find(): Promise<Repository[]> {
    return await this.service.find();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Repository> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateRepositoryDto): Promise<Repository> {
    const instance = new Repository(payload);
    return this.service.create(instance);
  }

  @Put(':id')
  @HttpCode(204)
  async updateById(
    @Param('id') id: number,
    @Body() payload: CreateRepositoryDto,
  ): Promise<void> {
    const instance = new Repository(payload);
    await this.service.findById(id);
    instance.idRepository = id;
    await this.service.update(instance);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeById(@Param('id') id: number): Promise<void> {
    await this.service.removeById(id);
  }
}
