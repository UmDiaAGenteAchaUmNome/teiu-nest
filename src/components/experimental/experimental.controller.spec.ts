import { Test, TestingModule } from '@nestjs/testing';
import { ExperimentalController } from './experimental.controller';

describe('ExperimentalController', () => {
  let controller: ExperimentalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperimentalController],
    }).compile();

    controller = module.get<ExperimentalController>(ExperimentalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
