import { Controller, Get, Header, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Parser } from 'json2csv';

import { RepositoriesService } from './repositories.service';
@ApiTags('Repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private service: RepositoriesService) {}

  @Get('/exercise-1')
  mock(): { repositories: { id: number; state: number }[] } {
    return this.service.mock();
  }

  @Get('exercise-4')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="export.csv"')
  getFile(): StreamableFile {
    const parser = new Parser({
      fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity'],
    });

    const json = [];

    json.push({
      ID: '1',
      Name: 'order.name',
      Email: 'order.email',
      'Product Title': '',
      Price: '',
      Quantity: '',
    });

    const csv = parser.parse(json);
    return new StreamableFile(Buffer.from(csv));
  }
}
