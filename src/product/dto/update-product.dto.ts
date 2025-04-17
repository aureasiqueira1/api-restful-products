import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsString, IsInt } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  nome?: string;

  @IsString()
  categoria?: string;

  @IsString()
  descricao?: string;

  preco?: number;

  @IsInt()
  quantidade_estoque?: number;
}
