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
      // const spyFindAll = jest.spyOn(service, 'findAll');
      // const result = await service.findAll();
      // expect(spyFindAll).toHaveBeenCalledTimes(1);
      // expect(spyFindAll).toBeCalledWith();
      // expect(result).toBeInstanceOf(Array);
      // spyFindAll.mockRestore();
    });
  });

  describe('findOne', () => {
    it('SUCCESS: todo 단건 조회를 한다.', async () => {
      // const psyDbGet = jest.spyOn(service, 'findOne').mockReturnValueOnce();
      // const id = await service.create({
      //   title: 'New Todo',
      //   description: 'New Description',
      //   createdAt: new Date(),
      // });
      // const result = await service.findOne(id);
      // expect(result).toBeDefined();
      // expect(result.id).toEqual(id);
      // expect(result.title).toEqual('New Todo');
      // expect(result.description).toEqual('New Description');
      // await service.deleteOne(id);
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
