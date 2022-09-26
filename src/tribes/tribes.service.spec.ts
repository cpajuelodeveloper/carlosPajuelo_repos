import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType } from '../common/tests/mock-type';
import { TribesService } from './tribes.service';
import { Tribe } from './tribe.entity';
import { TribesRepository } from './tribes.repository';
import { NotFoundException } from '@nestjs/common';

describe('TribesService', () => {
  const mockInstance = new Tribe({ idTribe: 1 });
  let service: TribesService;
  let repository: MockType<TribesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TribesService,
        {
          provide: getRepositoryToken(TribesRepository),
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

    service = module.get<TribesService>(TribesService);
    repository = module.get(getRepositoryToken(TribesRepository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tribe', async () => {
      mockInstance.name = 'tribe-name';
      repository.createInstance.mockImplementationOnce((dto) => {
        return <Tribe>{ ...dto };
      });
      const tribe = await service.create(mockInstance);
      expect(tribe).toEqual(mockInstance);
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
      const instance = await service.findById(mockInstance.idTribe);
      expect(instance).toEqual(mockInstance);
    });

    it('should throw EntityNotFoundException due to invalid id', async () => {
      const invalidId = null;
      repository.findById.mockReturnValue(null);
      await expect(service.findById(invalidId)).rejects.toThrowError(
        new NotFoundException('La Tribu no se encuentra registrada'),
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
        new NotFoundException('La Tribu no se encuentra registrada'),
      );
      expect(service.findById).toHaveBeenCalled();
    });
  });
});
