import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType } from '../common/tests/mock-type';
import { MetricsService } from './metrics.service';
import { Metric } from './metric.entity';
import { MetricsRepository } from './metrics.repository';
import { NotFoundException } from '@nestjs/common';

describe('MetricsService', () => {
  const mockInstance = new Metric({ idRepository: 1 });
  let service: MetricsService;
  let repository: MockType<MetricsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: getRepositoryToken(MetricsRepository),
          useValue: {
            createInstance: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
    repository = module.get(getRepositoryToken(MetricsRepository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new metric', async () => {
      mockInstance.bugs = 22;
      repository.createInstance.mockImplementationOnce((dto) => {
        return <Metric>{ ...dto };
      });
      const metric = await service.create(mockInstance);
      expect(metric).toEqual(mockInstance);
    });
  });

  describe('find', () => {
    it('should return an array of mocked instances', async () => {
      repository.find.mockReturnValueOnce([mockInstance]);
      const instance = await service.find();
      expect(repository.find).toHaveBeenCalled();
      expect(instance).toEqual([mockInstance]);
    });
  });

  describe('findById', () => {
    it('should return an instance', async () => {
      repository.findById.mockReturnValue(mockInstance);
      const instance = await service.findById(mockInstance.idRepository);
      expect(instance).toEqual(mockInstance);
    });

    it('should throw EntityNotFoundException due to invalid id', async () => {
      const invalidId = null;
      repository.findById.mockReturnValue(null);
      await expect(service.findById(invalidId)).rejects.toThrowError(
        new NotFoundException(Metric.name),
      );
      expect(repository.findById).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an instance', async () => {
      repository.update.mockReturnValueOnce(mockInstance);
      await service.update(mockInstance);
      expect(repository.update).toHaveBeenCalled();
    });
  });

  describe('removeById', () => {
    it('should remove an instance', async () => {
      jest.spyOn(service, 'findById').mockResolvedValueOnce(mockInstance);
      repository.remove.mockImplementationOnce(null);
      await service.removeById(1);
      expect(service.findById).toHaveBeenCalled();
      expect(repository.remove).toHaveBeenCalled();
    });

    it('should throw NotFoundException due to invalid id', async () => {
      const invalidId = null;
      jest.spyOn(service, 'findById');
      repository.findById.mockReturnValue(null);
      await expect(service.removeById(invalidId)).rejects.toThrowError(
        new NotFoundException(Metric.name),
      );
      expect(service.findById).toHaveBeenCalled();
    });
  });
});
