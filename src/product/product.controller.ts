import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PatchProductDto } from './dto/patch-product.dto.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    // Logic to create a new product using the data from createProductDto
   
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body() patchProductDto: PatchProductDto) {
    // Logic to update the product with the given id using the data from updateProductDto
    // You can implement this logic in the ProductService
    return this.productService.patchProduct(Number(id), patchProductDto);
  } 

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    // Logic to delete the product with the given id
    // You can implement this logic in the ProductService
    return this.productService.deleteProduct(Number(id));
  }

}
