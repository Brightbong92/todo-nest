import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DBService } from 'src/db.service';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, DBService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  describe('findAll', () => {
    it('SUCCESS: todo 리스트를 조회한다.', async () => {
      const result = await service.findAll();
      const spyFindAll = jest
        .spyOn(service, 'findAll')
        .mockResolvedValueOnce(result);

      expect(result).toBeInstanceOf(Array);
      expect(await service.findAll()).toEqual(result);

      expect(spyFindAll).toHaveBeenCalledTimes(1);
      expect(spyFindAll).toBeCalledWith();
      spyFindAll.mockRestore();
    });
  });

  describe('findOne', () => {
    it('SUCCESS: todo 단건 조회를 한다.', async () => {
      const id = 'db8596ce-29ca-4c2f-b423-367dc64bafa4';
      const findData = await service.findOne(id);

      const spyFindOne = jest
        .spyOn(service, 'findOne')
        .mockResolvedValue(findData);

      const result = await service.findOne(id);

      expect(result).toBeDefined();
      expect(result.id).toEqual(id);

      expect(spyFindOne).toHaveBeenCalled();
      expect(spyFindOne).toHaveBeenNthCalledWith(1, id);

      spyFindOne.mockRestore();
    });

    it('SUCCESS: NotFound 에러가 발생한다.', async () => {
      try {
        await service.findOne('not-found');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not Found');
      }
    });
  });
});
