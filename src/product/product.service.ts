import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductService {
  private products = [
    {
      id: 1,
      title: 'iPhone 17',
      price: 999,
      stock: 10,
    },
    {
      id: 2,
      title: 'MacBook Pro',
      price: 1999,
      stock: 5,
    },
    {
      id: 3,
      title: 'AirPods Pro',
      price: 249,
      stock: 20,
    },
  ];

  getAllProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  // Creates a new product and adds it to the products array
  createProduct(createProductDto: CreateProductDto) {
    const newProduct = {
      id: this.products.length + 1,
      ...createProductDto
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // Updates an existing product with the given id using the data from updateProductDto
  updateProduct(id: number, updateProductDto: Partial<CreateProductDto>) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      return {message: 'Product not found'}; // Product not found
    }
    // Update the product with the new data
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    return this.products[productIndex];
  }

}
