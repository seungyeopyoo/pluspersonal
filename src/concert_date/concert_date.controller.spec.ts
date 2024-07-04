import { Test, TestingModule } from '@nestjs/testing';
import { ConcertDateController } from './concert_date.controller';
import { ConcertDateService } from './concert_date.service';

describe('ConcertDateController', () => {
  let controller: ConcertDateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConcertDateController],
      providers: [ConcertDateService],
    }).compile();

    controller = module.get<ConcertDateController>(ConcertDateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
