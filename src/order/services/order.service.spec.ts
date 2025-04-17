import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { OrderProduct } from '../entities/order.product.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;

  const mockOrderRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };

  const mockProductRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('criarPedido', () => {
    it('deve criar um pedido com produtos válidos e estoque suficiente', async () => {
      const createPedidoDto = {
        produtos: [
          {
            produtoId: 1,
            quantidade: 2,
          },
        ],
      };

      const produtoMock = {
        id: 1,
        nome: 'Produto Teste',
        preco: 10,
        quantidade_estoque: 5,
      };

      mockProductRepository.findOne.mockResolvedValue(produtoMock);
      mockProductRepository.save.mockResolvedValue({ ...produtoMock, quantidade_estoque: 3 });
      mockOrderRepository.save.mockResolvedValue({
        id: 1,
        produtos: [expect.any(OrderProduct)],
        totalPedido: 20,
        status: 'Concluído',
      });

      const pedido = await service.criarPedido(createPedidoDto);

      expect(pedido.totalPedido).toBe(20);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockProductRepository.save).toHaveBeenCalled();
      expect(mockOrderRepository.save).toHaveBeenCalled();
    });

    it('deve lançar erro se o produto não for encontrado', async () => {
      const createPedidoDto = {
        produtos: [{ produtoId: 999, quantidade: 1 }],
      };

      mockProductRepository.findOne.mockResolvedValue(undefined);

      await expect(service.criarPedido(createPedidoDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar erro se não houver estoque suficiente', async () => {
      const createPedidoDto = {
        produtos: [{ produtoId: 1, quantidade: 10 }],
      };

      mockProductRepository.findOne.mockResolvedValue({
        id: 1,
        nome: 'Produto Teste',
        preco: 10,
        quantidade_estoque: 5,
      });

      await expect(service.criarPedido(createPedidoDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('listarPedidos', () => {
    it('deve retornar a lista de pedidos', async () => {
      const pedidosMock = [{ id: 1 }, { id: 2 }];

      mockOrderRepository.find.mockResolvedValue(pedidosMock);

      const result = await service.listarPedidos();

      expect(result).toEqual(pedidosMock);
      expect(mockOrderRepository.find).toHaveBeenCalled();
    });
  });
});
