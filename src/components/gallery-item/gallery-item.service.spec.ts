import { Test, TestingModule } from '@nestjs/testing';
import { GalleryItemService } from './gallery-item.service';

describe('GalleryItemService', () => {
  let service: GalleryItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalleryItemService],
    }).compile();

    service = module.get<GalleryItemService>(GalleryItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
