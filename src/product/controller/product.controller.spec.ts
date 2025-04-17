import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  const mockProductService = {
    criarProduto: jest.fn(),
    listarProdutos: jest.fn(),
    editarProduto: jest.fn(),
    deletarProduto: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve chamar o serviço para criar um produto', async () => {
      const dto: CreateProductDto = {
        nome: 'Produto A',
        preco: 10,
        quantidade_estoque: 100,
        categoria: ''
      };

      const createdProduct = { id: 1, ...dto };

      mockProductService.criarProduto.mockResolvedValue(createdProduct);

      const result = await controller.create(dto);

      expect(result).toEqual(createdProduct);
      expect(service.criarProduto).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os produtos', async () => {
      const produtos = [
        { id: 1, nome: 'Produto A', preco: 10, quantidade_estoque: 100 },
        { id: 2, nome: 'Produto B', preco: 20, quantidade_estoque: 50 },
      ];

      mockProductService.listarProdutos.mockResolvedValue(produtos);

      const result = await controller.findAll();

      expect(result).toEqual(produtos);
      expect(service.listarProdutos).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('deve atualizar um produto existente', async () => {
      const id = 1;
      const dto: UpdateProductDto = {
        nome: 'Produto Atualizado',
        preco: 15,
        quantidade_estoque: 80,
      };

      const updatedProduct = { id, ...dto };

      mockProductService.editarProduto.mockResolvedValue(updatedProduct);

      const result = await controller.update(id, dto);

      expect(result).toEqual(updatedProduct);
      expect(service.editarProduto).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('deve deletar um produto', async () => {
      const id = 1;
      const response = { message: 'Produto deletado com sucesso' };

      mockProductService.deletarProduto.mockResolvedValue(response);

      const result = await controller.remove(id);

      expect(result).toEqual(response);
      expect(service.deletarProduto).toHaveBeenCalledWith(id);
    });
  });
});
