import { Test, TestingModule } from '@nestjs/testing';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';

jest.mock('./organizations.service');
describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let service: OrganizationsService;
  const mockCreateOrganizationDto = new CreateOrganizationDto();
  const mockOrganization = new Organization({ idOrganization: 1 });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [OrganizationsService],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
    service = module.get<OrganizationsService>(OrganizationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new instance', async () => {
      mockCreateOrganizationDto.name = 'valid-name';
      mockOrganization.name = 'valid-name';
      jest.spyOn(service, 'create').mockResolvedValue(mockOrganization);
      const organization = await controller.create(mockCreateOrganizationDto);
      expect(organization.name).toEqual(mockCreateOrganizationDto.name);
    });
  });

  describe('find', () => {
    it('should return an instance', async () => {
      jest.spyOn(service, 'find').mockResolvedValue([mockOrganization]);
      const organization = await controller.find();
      expect(organization).toEqual([mockOrganization]);
      expect(service.find).toHaveBeenCalled();
    });

    it('should return more than 1 instance without filter', async () => {
      jest
        .spyOn(service, 'find')
        .mockResolvedValue([mockOrganization, mockOrganization]);
      const organization = await controller.find();
      expect(organization).toEqual([mockOrganization, mockOrganization]);
      expect(service.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an instance', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(mockOrganization);
      const organization = await controller.findById(1);
      expect(organization).toEqual(mockOrganization);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    it('should update an instance', async () => {
      jest.spyOn(service, 'update').mockImplementationOnce(null);
      await controller.updateById(1, mockCreateOrganizationDto);
      expect(service.update).toHaveBeenCalled();
    });
  });

  describe('removeById', () => {
    it('should remove an instance', async () => {
      jest.spyOn(service, 'removeById').mockImplementationOnce(null);
      await controller.removeById(1);
      expect(service.removeById).toHaveBeenCalled();
    });
  });
});
