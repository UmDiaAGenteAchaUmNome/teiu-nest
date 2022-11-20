import { Test, TestingModule } from '@nestjs/testing';
import { GalleryItemController } from './gallery-item.controller';

describe('GalleryItemController', () => {
  let controller: GalleryItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryItemController],
    }).compile();

    controller = module.get<GalleryItemController>(GalleryItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
