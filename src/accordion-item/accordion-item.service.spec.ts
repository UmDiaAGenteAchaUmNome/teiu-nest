import { Test, TestingModule } from '@nestjs/testing';
import { AccordionItemService } from './accordion-item.service';

describe('AccordionItemService', () => {
  let service: AccordionItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccordionItemService],
    }).compile();

    service = module.get<AccordionItemService>(AccordionItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
