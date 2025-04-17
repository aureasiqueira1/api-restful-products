import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProduct } from './order.product.entity';

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderProduct, pedidoProduto => pedidoProduto.pedido, {
    cascade: true,
    eager: true,
  })
  produtos: OrderProduct[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPedido: number;

  @Column({ type: 'enum', enum: ['Pendente', 'Concluído', 'Cancelado'], default: 'Pendente' })
  status: string;
  
}
