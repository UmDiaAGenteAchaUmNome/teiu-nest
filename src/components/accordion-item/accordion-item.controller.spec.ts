import { Test, TestingModule } from '@nestjs/testing';
import { AccordionItemController } from './accordion-item.controller';

describe('AccordionItemController', () => {
  let controller: AccordionItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccordionItemController],
    }).compile();

    controller = module.get<AccordionItemController>(AccordionItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
