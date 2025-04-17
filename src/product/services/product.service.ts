import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>,
  ) {}

  async criarProduto(createProdutoDto: CreateProductDto): Promise<Product> {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  async listarProdutos(): Promise<Product[]> {
    return this.produtoRepository.find();
  }

  async editarProduto(id: number, updateProdutoDto: UpdateProductDto): Promise<Product> {
    await this.produtoRepository.update(id, updateProdutoDto);
    const produto = await this.produtoRepository.findOne({ where: { id } });
  
    if (!produto) {
      throw new NotFoundException(`Produto com id ${id} não encontrado`);
    }
  
    return produto;
  }

  async deletarProduto(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
