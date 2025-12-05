import {
  userReducer,
  initialState,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getUserOrders,
  setUser,
  setAuthenticated,
  setLoading,
  TUserState
} from '../../services/slices/userSlice';
import { TUser, TOrder } from '@utils-types';

describe('userSlice', () => {
  const mockUser: TUser = {
    email: 'test@mail.ru',
    name: 'Petr Petrov'
  };

  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Order 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
      number: 1,
      ingredients: ['ing1', 'ing2']
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Редюсеры', () => {
    test('должен обрабатывать setUser', () => {
      const action = setUser(mockUser);
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
    });

    test('должен обрабатывать setAuthenticated', () => {
      const action = setAuthenticated(true);
      const state = userReducer(initialState, action);
      expect(state.isAuthenticated).toBe(true);
    });

    test('должен обрабатывать setLoading', () => {
      const action = setLoading(true);
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });
  });

  describe('registerUser - регистрация пользователя ', () => {
    test('должен обрабатывать registerUser.pending', () => {
      const action = { type: registerUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('должен обрабатывать registerUser.fulfilled', async () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    test('должен обрабатывать registerUser.rejected', () => {
      const errorMessage = 'Registration failed';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('loginUser - вход в ЛК', () => {
    test('должен обрабатывать loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('должен обрабатывать.fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    test('должен обрабатывать loginUser.rejected', () => {
      const errorMessage = 'Login failed';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('updateUser -обновление данных пользователя ', () => {
    test('должен обрабатывать updateUser.pending', () => {
      const action = { type: updateUser.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('должен обрабатывать updateUser.fulfilled', () => {
      const updatedUser = { ...mockUser, name: 'Updated Name' };
      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(updatedUser);
      expect(state.isAuthenticated).toBe(true);
    });

    test('должен обрабатывать updateUser.rejected', () => {
      const errorMessage = 'Update failed';
      const action = {
        type: updateUser.rejected.type,
        payload: errorMessage
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('getUserOrders - получение заказов пользователя', () => {
    test('должен обрабатывать getUserOrders.pending', () => {
      const action = { type: getUserOrders.pending.type };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeUndefined();
    });

    test('должен обрабатывать getUserOrders.fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.userOrders).toEqual(mockOrders);
    });
  });

  describe('logoutUser - выход пользователя из ЛК', () => {
    test('должен обрабатывать logoutUser.fulfilled', () => {
      const stateWithUser: TUserState = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
        userOrders: mockOrders
      };

      const action = { type: logoutUser.fulfilled.type };
      const state = userReducer(stateWithUser, action);

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });
  });
});
