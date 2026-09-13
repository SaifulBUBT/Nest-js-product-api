import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  getProduct() {
    return { message: 'Product API is working!' };
  }
}
