import { Injectable, NotFoundException } from '@nestjs/common';
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
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
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
  updateProduct(id: number, updateProductDto: Partial<UpdateProductDto>) {

    console.log('UpdateProductDto:', updateProductDto); // Log the received DTO for debugging

    const product = this.products.find((product) => product.id === id);
    console.log('Product :', product); // Log the index of the product to be updated

    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    // // Update the product with the new data
    const updatedProduct = {
      ...product,
      ...Object.fromEntries(
          Object.entries(updateProductDto).filter(([_, value]) => value !== undefined)
      )
    };
    const productIndex = this.products.findIndex((product) => product.id === id);
    this.products[productIndex] = updatedProduct;
    return updatedProduct;


    // const productIndex = this.products.findIndex(p => p.id === id);

    // if (productIndex === -1) {
    //   throw new NotFoundException(`Product with ID ${id} not found`);
    // }

    // Object.keys(updateProductDto).forEach((key) => {
    //   if (updateProductDto[key] !== undefined) {
    //     this.products[productIndex][key] = updateProductDto[key];
    //   }
    // });

    // return this.products[productIndex];


  }

  // Deletes the product with the given id from the products array
  deleteProduct(id: number) {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found');
    }
    const deletedProduct = this.products.splice(productIndex, 1);
    return deletedProduct[0];
  }

}
