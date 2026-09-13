import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, title: 'Laptop', price: 1000.99, stock: 100 },
    { id: 2, title: 'Mouse', price: 19.99, stock: 50 },
    { id: 3, title: 'Keyboard', price: 5.99, stock: 200 },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }
}
