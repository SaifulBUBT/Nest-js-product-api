import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    // Logic to create a new product using the data from createProductDto
   
    return this.productService.createProduct(createProductDto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto) {
    // Logic to update the product with the given id using the data from updateProductDto
    // You can implement this logic in the ProductService
    return this.productService.updateProduct(Number(id), updateProductDto);
  } 

}
