import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, pedido => pedido.produtos)
  pedido: Order;

  @ManyToOne(() => Product, produto => produto.pedidosProdutos)
  produto: Product;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;
}
