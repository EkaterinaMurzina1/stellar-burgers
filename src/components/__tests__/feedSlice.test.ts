import {
  feedsReducer,
  initialState,
  getFeeds,
  getOrderByNumber
} from '../../services/slices/feedSlice';
import { TOrder } from '@utils-types';

describe('feedsSlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Burger 1',
      createdAt: '2024-01-01T10:00:00.000Z',
      updatedAt: '2024-01-01T10:00:00.000Z',
      number: 1,
      ingredients: ['ing1', 'ing2', 'ing3']
    },
    {
      _id: '2',
      status: 'pending',
      name: 'Burger 2',
      createdAt: '2024-01-01T11:00:00.000Z',
      updatedAt: '2024-01-01T11:00:00.000Z',
      number: 2,
      ingredients: ['ing4', 'ing5']
    }
  ];

  const mockPreviewOrder: TOrder = {
    _id: '3',
    status: 'done',
    name: 'Burger Preview',
    createdAt: '2024-01-01T12:00:00.000Z',
    updatedAt: '2024-01-01T12:00:00.000Z',
    number: 3,
    ingredients: ['ing6', 'ing7', 'ing8']
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getFeeds -заказы ', () => {
    test('должен обрабатывать getFeeds.pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedsReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });

    test('должен обрабатывать getFeeds.fulfilled', () => {
      const mockFeedsResponse = {
        orders: mockOrders,
        total: 100,
        totalToday: 10
      };

      const action = {
        type: getFeeds.fulfilled.type,
        payload: mockFeedsResponse
      };

      const state = feedsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
      expect(state.total).toBe(100);
      expect(state.totalToday).toBe(10);
    });

    test('должен обрабатывать getFeeds.rejected (Failed)', () => {
      const action = { type: getFeeds.rejected.type };
      const state = feedsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
    });
  });

  describe('getOrderByNumber - получение заказа по номеру', () => {
    test('должен обрабатывать getOrderByNumber.pending (Request)', () => {
      const action = { type: getOrderByNumber.pending.type };
      const state = feedsReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.previewOrder).toBeNull();
    });

    test('должен обрабатывать getOrderByNumber.fulfilled (Success)', () => {
      const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: [mockPreviewOrder]
      };

      const state = feedsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.previewOrder).toEqual(mockPreviewOrder);
    });

    test('должен обрабатывать getOrderByNumber.rejected (Failed)', () => {
      const action = { type: getOrderByNumber.rejected.type };
      const state = feedsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.previewOrder).toBeNull();
    });
  });
});
