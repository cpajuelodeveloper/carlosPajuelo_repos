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

import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private service: OrganizationsService) {}

  @Get()
  async find(): Promise<Organization[]> {
    return await this.service.find();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Organization> {
    return this.service.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateOrganizationDto): Promise<Organization> {
    const instance = <Organization>{ ...payload };
    return this.service.create(instance);
  }

  @Put(':id')
  @HttpCode(204)
  async updateById(
    @Param('id') id: number,
    @Body() payload: CreateOrganizationDto,
  ): Promise<void> {
    const instance = <Organization>{ ...payload };
    await this.service.findById(id);
    instance.idOrganization = id;
    await this.service.update(instance);
  }

  @Delete(':id')
  @HttpCode(204)
  async removeById(@Param('id') id: number): Promise<void> {
    await this.service.removeById(id);
  }
}
