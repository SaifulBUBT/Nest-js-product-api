import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PatchProductDto } from './dto/patch-product.dto.js';
import { ProductQueryDto } from './dto/product-query.dto.js';
import { PositiveIntPipe } from '../common/pipes/positive-int/positive-int.pipe.js';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(
    @Query() query: ProductQueryDto,
  ) {

    console.log('Search string: ',query);

    return this.productService.getAllProducts(query);
  }

  @Get(':id')
  async getProductById(@Param('id', new PositiveIntPipe()) id: number) {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    // Logic to create a new product using the data from createProductDto
   
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchProductDto: PatchProductDto) {
    // Logic to update the product with the given id using the data from updateProductDto
    // You can implement this logic in the ProductService
    return this.productService.patchProduct(id, patchProductDto);
  } 

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    // Logic to delete the product with the given id
    // You can implement this logic in the ProductService
    return this.productService.deleteProduct(id);
  }

}
