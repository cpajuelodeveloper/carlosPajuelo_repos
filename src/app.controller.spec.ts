import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as pjson from '../package.json';

describe('AppController', () => {
  let appController: AppController;
  const mockStatusResponse = {
    name: pjson['name'],
    version: pjson['version'],
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('AppController', () => {
    it('should return server status', () => {
      expect(appController.getStatus()).toEqual(
        expect.objectContaining({
          name: mockStatusResponse.name,
          version: mockStatusResponse.version,
        }),
      );
    });
  });
});
