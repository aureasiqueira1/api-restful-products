import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../../product/entities/product.entity';
import { OrderProduct } from '../entities/order.product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private pedidoRepository: Repository<Order>,
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>,
  ) {}

  async criarPedido(createPedidoDto: CreateOrderDto): Promise<Order> {
    const { produtos } = createPedidoDto;
    let totalPedido = 0;

    const itensPedido: OrderProduct[] = [];

    for (const item of produtos) {
      const produto = await this.produtoRepository.findOne({ where: { id: item.produtoId } });
  
      if (!produto) {
        throw new NotFoundException(`Produto com ID ${item.produtoId} não encontrado`);
      }
  
      if (produto.quantidade_estoque < item.quantidade) {
        throw new BadRequestException(`Produto "${produto.nome}" não tem estoque suficiente`);
      }
  
      const subtotal = produto.preco * item.quantidade;
      totalPedido += subtotal;
  
      const pedidoProduto = new OrderProduct();
      pedidoProduto.produto = produto;
      pedidoProduto.quantidade = item.quantidade;
      pedidoProduto.subtotal = subtotal;
  
      // Atualizar estoque
      produto.quantidade_estoque -= item.quantidade;
      await this.produtoRepository.save(produto);
  
      itensPedido.push(pedidoProduto);
    }
  
    const pedido = new Order();
    pedido.produtos = itensPedido;
    pedido.totalPedido = totalPedido;
    pedido.status = 'Concluído';
  
    return await this.pedidoRepository.save(pedido);
  }

  async listarPedidos(): Promise<Order[]> {
    return this.pedidoRepository.find();
  }
}
