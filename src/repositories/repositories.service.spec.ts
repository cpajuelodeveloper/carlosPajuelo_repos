import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType } from '../common/tests/mock-type';
import { RepositoriesService } from './repositories.service';
import { Repository } from './repository.entity';
import { RepositoriesRepository } from './repositories.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { RepositoryMetrics } from '../common/interfaces/repository-metrics.interface';
import { MINIMUN_COVERAGE } from '../config/constants';

describe('RepositoriesService', () => {
  const mockInstance = new Repository({ idRepository: 1 });
  const mockCreateRepositoryDto = new CreateRepositoryDto();
  let service: RepositoriesService;
  let repository: MockType<RepositoriesRepository>;
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
  const mockRepositoryMetrics = new RepositoryMetrics();
  mockRepositoryMetrics.id = 1;
  mockRepositoryMetrics.bugs = 10;
  mockRepositoryMetrics.codeSmells = 20;
  mockRepositoryMetrics.coverage = 80;
  mockRepositoryMetrics.hotspots = 3;
  mockRepositoryMetrics.organization = 'valid-organization';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepositoriesService,
        {
          provide: getRepositoryToken(RepositoriesRepository),
          useValue: {
            createInstance: jest.fn(),
            find: jest.fn(),
            remove: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            createQueryBuilder: jest.fn(() => ({
              select: jest.fn().mockReturnThis(),
              addSelect: jest.fn().mockReturnThis(),
              innerJoin: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              getRawMany: jest.fn().mockReturnThis(),
            })),
          },
        },
      ],
    }).compile();

    service = module.get<RepositoriesService>(RepositoriesService);
    repository = module.get(getRepositoryToken(RepositoriesRepository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new organization', async () => {
      mockInstance.name = 'valid-name';
      mockCreateRepositoryDto.name = 'valid-name';
      repository.createInstance.mockImplementationOnce((dto) => {
        return <Repository>{ ...dto };
      });
      const instance = await service.create(mockInstance);
      expect(instance.name).toEqual(mockInstance.name);
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
        new NotFoundException(Repository.name),
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
        new NotFoundException(Repository.name),
      );
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('mock', () => {
    it('should return mocked reponse', () => {
      expect(service.mock()).toEqual(mockResponse);
    });
  });

  describe('getRepositoryMetrics', () => {
    it('should throw an NotFoundException when not exists metrics with the minimun coverage', async () => {
      await expect(
        service.getRepositoryMetrics(1, MINIMUN_COVERAGE),
      ).rejects.toThrowError(
        new NotFoundException(
          'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
        ),
      );
    });

    it('should return the repository metrics', async () => {
      repository.createQueryBuilder.mockImplementationOnce(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawMany: () => [mockRepositoryMetrics],
      }));
      const result = await service.getRepositoryMetrics(1);
      expect(result).toEqual([mockRepositoryMetrics]);
    });

    it('should return the repository metrics', async () => {
      repository.createQueryBuilder.mockImplementationOnce(() => ({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getRawMany: () => [mockRepositoryMetrics],
      }));
      const result = await service.getRepositoryMetrics(1, MINIMUN_COVERAGE);
      expect(result).toEqual([mockRepositoryMetrics]);
    });
  });
});
