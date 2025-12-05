import {
  ingredientsReducer,
  initialState,
  getIngredients
} from '../../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredients slice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '12',
      name: 'Булка',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 40,
      calories: 250,
      price: 100,
      image: 'bun1.jpg',
      image_large: 'bun1-large.png',
      image_mobile: 'bun1-mobile.png'
    },
    {
      _id: '13',
      name: 'Соус',
      type: 'main',
      proteins: 20,
      fat: 15,
      carbohydrates: 0,
      calories: 300,
      price: 50,
      image: 'souce.jpg',
      image_large: 'souce-large.png',
      image_mobile: 'souce-mobile.png'
    },
    {
      _id: '14',
      name: 'Котлета',
      type: 'main',
      proteins: 30,
      fat: 20,
      carbohydrates: 5,
      calories: 400,
      price: 80,
      image: 'patty.png',
      image_large: 'patty-large.png',
      image_mobile: 'patty-mobile.png'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getIngredients - получение ингредиентов', () => {
    test('должен обрабатывать getIngredients.pending', () => {
      const action = { type: getIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual([]);
    });

    test('должен обрабатывать getIngredients.fulfilled', () => {
      const action = {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      };

      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredients);
    });

    test('должен обрабатывать getIngredients.rejected', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: getIngredients.rejected.type,
        error: { message: errorMessage }
      };

      const state = ingredientsReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Ошибка загрузки ингредиентов');
      expect(state.ingredients).toEqual([]);
    });
  });
});
