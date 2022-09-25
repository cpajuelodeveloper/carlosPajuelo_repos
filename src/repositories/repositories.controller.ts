import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Parser } from 'json2csv';
import { TribesService } from 'src/tribes/tribes.service';

import { RepositoryMetrics } from '../common/interfaces/repository-metrics.interface';
import { MINIMUN_COVERAGE } from '../config/constants';
import { RepositoriesService } from './repositories.service';
@ApiTags('Repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(
    private service: RepositoriesService,
    private tribesService: TribesService,
  ) {}

  @Get('/exercise-1')
  mock(): { repositories: { id: number; state: number }[] } {
    return this.service.mock();
  }

  @Get('/exercise-3/tribe/:id')
  async getRepositoryFilteredMetrics(
    @Param('id') id: number,
  ): Promise<RepositoryMetrics[]> {
    await this.tribesService.findById(id);
    return this.service.getRepositoryMetrics(id, MINIMUN_COVERAGE);
  }

  @Get('exercise-4/tribe/:id')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="export.csv"')
  async getFile(@Param('id') id: number): Promise<StreamableFile> {
    await this.tribesService.findById(id);
    const metrics = await this.service.getRepositoryMetrics(
      id,
      MINIMUN_COVERAGE,
    );
    const parser = new Parser({
      fields: Object.keys(metrics[0]),
    });
    const csv = parser.parse(metrics);
    return new StreamableFile(Buffer.from(csv));
  }
}
