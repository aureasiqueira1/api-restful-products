import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

@ApiTags('produtos') 
@Controller('product')
export class ProductController {
  constructor(private readonly produtoService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso', type: Product })
  create(@Body() createProdutoDto: CreateProductDto) {
    return this.produtoService.criarProduto(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos', type: [Product] })
  findAll() {
    return this.produtoService.listarProdutos();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um produto existente' })
  @ApiResponse({ status: 200, description: 'Produto atualizado', type: Product })
  update(@Param('id') id: number, @Body() updateProdutoDto: UpdateProductDto) {
    return this.produtoService.editarProduto(id, updateProdutoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um produto' })
  @ApiResponse({ status: 200, description: 'Produto deletado' })
  remove(@Param('id') id: number) {
    return this.produtoService.deletarProduto(id);
  }
}
