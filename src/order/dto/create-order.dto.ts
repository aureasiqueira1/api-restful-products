import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Lista de produtos com seus IDs e quantidades para o pedido',
  })
  produtos: { produtoId: number, quantidade: number }[];
}
