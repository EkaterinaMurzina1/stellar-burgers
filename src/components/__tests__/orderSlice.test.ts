import { TOrder } from '@utils-types';
import {
  orderReducer,
  initialState,
  createOrder
} from '../../services/slices/orderSlice';

describe('orderSlice', () => {
  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Burger 1',
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
    number: 1,
    ingredients: ['ing1', 'ing2', 'ing3']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder - создание заказа ', () => {
    test('должен обрабатывать createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.orderModalData).toBeNull();
    });

    test('должен обрабатывать createOrder.fulfilled', () => {
      const mockApiResponse = {
        order: mockOrder,
        success: true
      };

      const action = {
        type: createOrder.fulfilled.type,
        payload: mockApiResponse
      };

      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(mockOrder);
    });
  });
});
