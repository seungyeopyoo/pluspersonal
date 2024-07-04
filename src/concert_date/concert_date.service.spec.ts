import { Test, TestingModule } from '@nestjs/testing';
import { ConcertDateService } from './concert_date.service';

describe('ConcertDateService', () => {
  let service: ConcertDateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertDateService],
    }).compile();

    service = module.get<ConcertDateService>(ConcertDateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
