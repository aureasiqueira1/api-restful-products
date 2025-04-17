import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './services/order.service';
import { OrderController } from './controller/order.controller';
import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order.product.entity';
import { Product } from '../product/entities/product.entity';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderProduct, Product]),        
    ProductModule
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
