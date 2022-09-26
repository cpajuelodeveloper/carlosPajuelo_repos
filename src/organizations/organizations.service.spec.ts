import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MockType } from '../common/tests/mock-type';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsRepository } from './organizations.repository';
import { NotFoundException } from '@nestjs/common';

describe('OrganizationsService', () => {
  const mockInstance = new Organization({ idOrganization: 1 });
  const mockCreateOrganizationDto = new CreateOrganizationDto();
  let service: OrganizationsService;
  let repository: MockType<OrganizationsRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: getRepositoryToken(OrganizationsRepository),
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

    service = module.get<OrganizationsService>(OrganizationsService);
    repository = module.get(getRepositoryToken(OrganizationsRepository));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new organization', async () => {
      mockInstance.name = 'valid-name';
      mockCreateOrganizationDto.name = 'valid-name';
      repository.createInstance.mockImplementationOnce((dto) => {
        return <Organization>{ ...dto };
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
      const instance = await service.findById(mockInstance.idOrganization);
      expect(instance).toEqual(mockInstance);
    });

    it('should throw EntityNotFoundException due to invalid id', async () => {
      const invalidId = null;
      repository.findById.mockReturnValue(null);
      await expect(service.findById(invalidId)).rejects.toThrowError(
        new NotFoundException(Organization.name),
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
        new NotFoundException(Organization.name),
      );
      expect(service.findById).toHaveBeenCalled();
    });
  });
});
