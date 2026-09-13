import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service.js';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update only the fields supplied in a PATCH request', () => {
    const updatedProduct = service.updateProduct(1, { title: 'Samsung Galaxy S26' });

    expect(updatedProduct).toEqual({
      id: 1,
      title: 'Samsung Galaxy S26',
      price: 999,
      stock: 10,
    });
  });
});
