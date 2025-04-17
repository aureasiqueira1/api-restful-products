import { OrderProduct } from '../../order/entities/order.product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @Column({ type: 'varchar', length: 150 })
  categoria: string;

  @Column({ type: 'varchar', length: 180 })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'integer' })
  quantidade_estoque: number;

  @OneToMany(() => OrderProduct, pedidoProduto => pedidoProduto.produto)
  pedidosProdutos: OrderProduct[];
}
