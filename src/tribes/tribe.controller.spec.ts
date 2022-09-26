import { Test, TestingModule } from '@nestjs/testing';

import { TribesController } from './tribes.controller';
import { TribesService } from './tribes.service';
import { Tribe } from './tribe.entity';
import { CreateTribeDto } from './dto/create-tribe.dto';

jest.mock('./tribes.service');
describe('TribesController', () => {
  let controller: TribesController;
  let service: TribesService;
  const mockCreateTribeDto = new CreateTribeDto();
  const mockTribe = new Tribe({ idTribe: 1 });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribesController],
      providers: [TribesService],
    }).compile();

    controller = module.get<TribesController>(TribesController);
    service = module.get<TribesService>(TribesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new instance', async () => {
      mockCreateTribeDto.name = 'valid-name';
      mockTribe.name = 'valid-name';
      jest.spyOn(service, 'create').mockResolvedValue(mockTribe);
      const tribe = await controller.create(mockCreateTribeDto);
      expect(tribe.name).toEqual(mockCreateTribeDto.name);
    });
  });

  describe('find', () => {
    it('should return an instance', async () => {
      jest.spyOn(service, 'find').mockResolvedValue([mockTribe]);
      const tribe = await controller.find();
      expect(tribe).toEqual([mockTribe]);
      expect(service.find).toHaveBeenCalled();
    });

    it('should return more than 1 instance without filter', async () => {
      jest.spyOn(service, 'find').mockResolvedValue([mockTribe, mockTribe]);
      const tribe = await controller.find();
      expect(tribe).toEqual([mockTribe, mockTribe]);
      expect(service.find).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an instance', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(mockTribe);
      const tribe = await controller.findById(1);
      expect(tribe).toEqual(mockTribe);
      expect(service.findById).toHaveBeenCalled();
    });
  });

  describe('updateById', () => {
    it('should update an instance', async () => {
      jest.spyOn(service, 'update').mockImplementationOnce(null);
      await controller.updateById(1, mockCreateTribeDto);
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
