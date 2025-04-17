import { Repository } from "typeorm";
import { ProductService } from "./product.service";
import { Product } from "../entities/product.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { NotFoundException } from "@nestjs/common";

describe('ProductService', () => {
  let service: ProductService;
  let repository: jest.Mocked<Repository<Product>>;

  const mockProdutoRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProdutoRepository,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    repository = module.get(getRepositoryToken(Product));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('criarProduto', () => {
    it('deve criar e salvar um novo produto', async () => {
      const dto: CreateProductDto = {
        nome: 'Produto Teste',
        preco: 50,
        quantidade_estoque: 20,
        categoria: '',
      };

      const entity = { 
        id: 1, 
        descricao: "descricao",
        pedidosProdutos: [], 
        ...dto 
      };

      repository.create.mockReturnValue(entity);
      repository.save.mockResolvedValue(entity);

      const result = await service.criarProduto(dto);

      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(entity);
      expect(result).toEqual(entity);
    });
  });

  describe('listarProdutos', () => {
    it('deve retornar todos os produtos', async () => {
      const produtos: Product[] = [
        {
          id: 1, nome: 'Produto A', preco: 10, quantidade_estoque: 5, pedidosProdutos: [],
          categoria: "",
          descricao: ""
        },
        {
          id: 2, nome: 'Produto B', preco: 15, quantidade_estoque: 8, pedidosProdutos: [],
          categoria: "",
          descricao: ""
        },
      ];

      repository.find.mockResolvedValue(produtos);

      const result = await service.listarProdutos();

      expect(result).toEqual(produtos);
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('editarProduto', () => {
    it('deve lançar NotFoundException se o produto não for encontrado', async () => {
      const id = 999;
      const dto: UpdateProductDto = {
        nome: 'Inexistente',
        preco: 0,
        quantidade_estoque: 0,
      };

      repository.findOne.mockResolvedValue(null);

      await expect(service.editarProduto(id, dto)).rejects.toThrow(
        new NotFoundException(`Produto com id ${id} não encontrado`)
      );

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('deletarProduto', () => {
    it('deve deletar o produto', async () => {
      const id = 1;

      await service.deletarProduto(id);

      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });
});
