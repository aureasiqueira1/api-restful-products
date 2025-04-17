import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../services/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    criarPedido: jest.fn(),
    listarPedidos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call OrderService.criarPedido with correct dto', async () => {
      const dto: CreateOrderDto = {
        produtos: [{ produtoId: 1, quantidade: 2 }],
      };
      const result = { id: 1, totalPedido: 100, status: 'Concluído' };

      mockOrderService.criarPedido.mockResolvedValue(result);

      const response = await controller.create(dto);

      expect(service.criarPedido).toHaveBeenCalledWith(dto);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all orders', async () => {
      const mockOrders = [
        { id: 1, totalPedido: 100, status: 'Concluído' },
        { id: 2, totalPedido: 50, status: 'Pendente' },
      ];

      mockOrderService.listarPedidos.mockResolvedValue(mockOrders);

      const result = await controller.findAll();

      expect(service.listarPedidos).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });
});
