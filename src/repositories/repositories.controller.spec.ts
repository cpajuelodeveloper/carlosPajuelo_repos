import { Test, TestingModule } from '@nestjs/testing';

import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { TribesService } from '../tribes/tribes.service';
import { Tribe } from '../tribes/tribe.entity';
import { RepositoryMetrics } from '../common/interfaces/repository-metrics.interface';
import { Parser } from 'json2csv';
import { StreamableFile } from '@nestjs/common';

jest.mock('./repositories.service');
jest.mock('../tribes/tribes.service');
describe('RepositoriesController', () => {
  let controller: RepositoriesController;
  let service: RepositoriesService;
  let tribesService: TribesService;
  const mockResponse = {
    repositories: [
      {
        id: 1,
        state: 604,
      },
      {
        id: 2,
        state: 605,
      },
      {
        id: 3,
        state: 606,
      },
    ],
  };
  const mockTribe = new Tribe({ idTribe: 1 });
  const mockRepositoryMetrics = new RepositoryMetrics();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [RepositoriesService, TribesService],
    }).compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
    service = module.get<RepositoriesService>(RepositoriesService);
    tribesService = module.get<TribesService>(TribesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('mock', () => {
    it('should return mocked reponse', () => {
      jest.spyOn(service, 'mock').mockReturnValueOnce(mockResponse);
      expect(controller.mock()).toEqual(mockResponse);
      expect(service.mock).toBeCalledTimes(1);
    });
  });

  describe('getRepositoryFilteredMetrics', () => {
    it('should return an instance', async () => {
      jest.spyOn(tribesService, 'findById').mockResolvedValue(mockTribe);
      jest
        .spyOn(service, 'getRepositoryMetrics')
        .mockResolvedValue([mockRepositoryMetrics]);
      const repository = await controller.getRepositoryFilteredMetrics(1);
      expect(repository).toEqual([mockRepositoryMetrics]);
      expect(tribesService.findById).toHaveBeenCalled();
      expect(service.getRepositoryMetrics).toHaveBeenCalled();
    });
  });

  describe('getFile', () => {
    it('should return an csv file', async () => {
      mockRepositoryMetrics.id = 1;
      mockRepositoryMetrics.name = 'repository-name';
      mockRepositoryMetrics.organization = 'organization-name';
      mockRepositoryMetrics.tribe = 'tribe-name';
      const parser = new Parser({
        fields: Object.keys(mockRepositoryMetrics),
      });
      const csv = parser.parse([mockRepositoryMetrics]);
      jest.spyOn(tribesService, 'findById').mockResolvedValue(mockTribe);
      jest
        .spyOn(service, 'getRepositoryMetrics')
        .mockResolvedValue([mockRepositoryMetrics]);
      const repository = await controller.getFile(1);
      expect(repository).toEqual(new StreamableFile(Buffer.from(csv)));
      expect(tribesService.findById).toHaveBeenCalled();
      expect(service.getRepositoryMetrics).toHaveBeenCalled();
    });
  });
});
