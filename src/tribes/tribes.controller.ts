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

import { TribesService } from './tribes.service';
import { Tribe } from './tribe.entity';
import { CreateTribeDto } from './dto/create-tribe.dto';
@ApiTags('Tribes')
@Controller('tribes')
export class TribesController {
  constructor(private service: TribesService) {}

  @Get()
  async find(): Promise<Tribe[]> {
    return await this.service.find();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Tribe> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateTribeDto): Promise<Tribe> {
    const instance = new Tribe(payload);
    return this.service.create(instance);
  }

  @Put(':id')
  @HttpCode(204)
  async updateById(
    @Param('id') id: number,
    @Body() payload: CreateTribeDto,
  ): Promise<void> {
    const instance = <Tribe>{ ...payload };
    await this.service.findById(id);
    instance.idTribe = id;
    await this.service.update(instance);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeById(@Param('id') id: number): Promise<void> {
    await this.service.removeById(id);
  }
}
