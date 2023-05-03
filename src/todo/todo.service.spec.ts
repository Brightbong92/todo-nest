import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { DbService } from '../db.service';

describe('TodoService', () => {
  let service: TodoService;

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
    it('it should be a return Array', async () => {
      const result = await service.findAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('it should be return a todo', async () => {
      const id = await service.create({
        title: 'New Todo',
        description: 'New Description',
        createdAt: new Date(),
      });

      const result = await service.findOne(id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(id);
      expect(result.title).toEqual('New Todo');
      expect(result.description).toEqual('New Description');
      await service.deleteOne(id);
    });
  });
});
