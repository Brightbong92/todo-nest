import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DbService } from 'src/db.service';
import { NotFoundException } from '@nestjs/common';

describe('TodoService', () => {
  let service: TodoService;
  let dbService: DbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, DbService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('todo 리스트를 조회한다.', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      // const result = await service.findAll();
      // expect(result).toBeInstanceOf(Array);
    });
  });

  // describe('findOne', () => {
  //   it('it should be return a todo', async () => {
  //     const id = await service.create({
  //       title: 'New Todo',
  //       description: 'New Description',
  //       createdAt: new Date(),
  //     });

  //     const result = await service.findOne(id);
  //     expect(result).toBeDefined();
  //     expect(result.id).toEqual(id);
  //     expect(result.title).toEqual('New Todo');
  //     expect(result.description).toEqual('New Description');
  //     await service.deleteOne(id);
  //   });

  //   it('it should be throw error', async () => {
  //     try {
  //       await service.findOne('not-found');
  //     } catch (e) {
  //       expect(e).toBeInstanceOf(NotFoundException);
  //       expect(e.message).toEqual('Not Found');
  //     }
  //   });
  // });
});
