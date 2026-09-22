import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductController } from './product.controller.js';
import { ProductService } from './product.service.js';
import { LoggerMiddleware } from '../common/middleware/logger/logger.middleware.js';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .forRoutes('products');
      .forRoutes(
        {
          path: 'products',
          method: RequestMethod.GET,
        },
        {
          path: 'products',
          method: RequestMethod.POST,
        },
      );
  }
}
