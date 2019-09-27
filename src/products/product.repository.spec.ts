import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  it('should be defined', () => {
    expect(new ProductRepository()).toBeDefined();
  });
});
