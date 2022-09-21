import { Injectable } from '@nestjs/common';

import * as pjson from '../package.json';

const started = new Date();

@Injectable()
export class AppService {
  status(): object {
    return {
      name: pjson['name'],
      version: pjson['version'],
      started: started,
      uptime: (Date.now() - Number(started)) / 1000,
    };
  }
}
