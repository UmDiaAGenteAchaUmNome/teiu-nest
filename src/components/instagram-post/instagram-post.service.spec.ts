import { Test, TestingModule } from '@nestjs/testing';
import { InstagramPostService } from './instagram-post.service';

describe('InstagramPostService', () => {
  let service: InstagramPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstagramPostService],
    }).compile();

    service = module.get<InstagramPostService>(InstagramPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
