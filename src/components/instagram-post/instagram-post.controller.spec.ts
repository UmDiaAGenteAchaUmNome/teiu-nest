import { Test, TestingModule } from '@nestjs/testing';
import { InstagramPostController } from './instagram-post.controller';

describe('InstagramPostController', () => {
  let controller: InstagramPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstagramPostController],
    }).compile();

    controller = module.get<InstagramPostController>(InstagramPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
