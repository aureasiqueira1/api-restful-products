import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDecimal, IsInt, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Nome do produto' })
  nome: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Categoria do produto' })
  categoria: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Descrição do produto', required: false })
  descricao?: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Preço do produto' })
  preco: number;

  @IsInt()
  @ApiProperty({ description: 'Quantidade em estoque do produto' })
  quantidade_estoque: number;
}
