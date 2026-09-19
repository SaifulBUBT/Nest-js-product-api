import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PatchProductDto } from './dto/patch-product.dto.js';

import { DatabaseService } from '../database/database.service.js';
import { Product } from './interfaces/product.interface.js';

@Injectable()
export class ProductService {
  constructor(private readonly databaseService: DatabaseService) {}

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


  async getAllProducts(): Promise<Product[]> {
    // return this.products;

    // Fetch products from the database using the DatabaseService
    const result = await this.databaseService.query(
      'SELECT * FROM products'
    );
    return result.rows;
  }

  async getProductById(id: number): Promise<Product> {
    // const product = this.products.find((product) => product.id === id);
    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }
    // return product;


    const result = await this.databaseService.query(
      'SELECT * FROM products WHERE id = $1',
      [id],
    );
    const product = result.rows[0];
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;

  }
    
  // Creates/POST a new product and adds it to the products array
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // const newProduct = {
    //   id: this.products.length + 1,
    //   ...createProductDto
    // };
    // this.products.push(newProduct);
    // return newProduct;

    const { title, price, stock } = createProductDto;
    const result = await this.databaseService.query(
      'INSERT INTO products (title, price, stock) VALUES ($1, $2, $3) RETURNING *',
      [title, price, stock],
    );
    return result.rows[0];
  }

  // Updates an existing product with the given id using the data from updateProductDto
  async patchProduct(id: number, patchProductDto: Partial<PatchProductDto>) {

    console.log('PatchProductDto:', patchProductDto); // Log the received DTO for debugging

    // const product = this.products.find((product) => product.id === id);
    // console.log('Product :', product); // Log the index of the product to be updated

    // if (!product) {
    //   throw new NotFoundException('Product not found');
    // }
  
    // // // Update the product with the new data
    // const updatedProduct = {
    //   ...product,
    //   ...Object.fromEntries(
    //       Object.entries(patchProductDto).filter(([_, value]) => value !== undefined)
    //   )
    // };
    // const productIndex = this.products.findIndex((product) => product.id === id);
    // this.products[productIndex] = updatedProduct;
    // return updatedProduct;

      const fields: string[] = [];
      const values: unknown[] = [];

      if (patchProductDto.title !== undefined) {
        fields.push(`title = $${values.length + 1}`);
        values.push(patchProductDto.title);
      }

      if (patchProductDto.price !== undefined) {
        fields.push(`price = $${values.length + 1}`);
        values.push(patchProductDto.price);
      }

      if (patchProductDto.stock !== undefined) {
        fields.push(`stock = $${values.length + 1}`);
        values.push(patchProductDto.stock);
      }

      if (fields.length === 0) {
        return this.getProductById(id);
      }

      values.push(id);

      const result = await this.databaseService.query(
        `UPDATE products
        SET ${fields.join(', ')}
        WHERE id = $${values.length}
        RETURNING *`,
        values,
      );

      if (result.rows.length === 0) {
        throw new NotFoundException(
          `Customer with ID ${id} not found`,
        );
      }

      return result.rows[0];

  }

  // Deletes the product with the given id from the products array
  async deleteProduct(id: number): Promise<Product> {
    // const productIndex = this.products.findIndex((product) => product.id === id);
    // if (productIndex === -1) {
    //   throw new NotFoundException('Product not found');
    // }
    // const deletedProduct = this.products.splice(productIndex, 1);
    // return deletedProduct[0];

    const result = await this.databaseService.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id],
    );

    if (result.rows.length === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return result.rows[0];

  }

}
