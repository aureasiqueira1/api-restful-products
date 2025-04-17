import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';

@ApiTags('pedidos')  
@Controller('order')
export class OrderController {
  constructor(private readonly pedidoService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido' })
  @ApiResponse({ status: 201, description: 'Pedido criado com sucesso', type: Order })
  create(@Body() createPedidoDto: CreateOrderDto) {
    return this.pedidoService.criarPedido(createPedidoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pedidos' })
  @ApiResponse({ status: 200, description: 'Lista de pedidos', type: [Order] })
  findAll() {
    return this.pedidoService.listarPedidos();
  }
}
