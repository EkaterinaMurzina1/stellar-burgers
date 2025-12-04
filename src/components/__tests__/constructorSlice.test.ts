import {
  addBun,
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  ConstructorState
} from '../../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

import {
  constructorReducer,
  initialState
} from '../../services/slices/constructorSlice';

describe('constructorSlice', () => {
  const mockBun: TConstructorIngredient = {
    id: '12',
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
  };

  const mockIngredient1: TConstructorIngredient = {
    id: '13',
    _id: '13',
    name: 'Соус',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 0,
    calories: 300,
    price: 50,
    image: 'souce.png',
    image_large: 'souce-large.png',
    image_mobile: 'souce-mobile.png'
  };

  const mockIngredient2: TConstructorIngredient = {
    id: '14',
    _id: '14',
    name: 'Котлета',
    type: 'main',
    proteins: 30,
    fat: 20,
    carbohydrates: 5,
    calories: 400,
    price: 80,
    image: 'patty.jpg',
    image_large: 'patty-large.png',
    image_mobile: 'patty-mobile.png'
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('добавить булку', () => {
    const newState = constructorReducer(initialState, addBun(mockBun));
    const bun = newState.constructorItems.bun;
    expect(bun).toEqual({ ...mockBun });
  });

  test('добавить ингредиент', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(mockIngredient1)
    );
    const expectedIngredient = newState.constructorItems.ingredients[0];
    const arrayIngredients = newState.constructorItems.ingredients.length;
    expect(expectedIngredient).toEqual({
      ...mockIngredient1,
      id: expect.any(String)
    });
    expect(arrayIngredients).toBe(1);
  });
  test('удалить ингредиент', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient1]
      }
    };
    const newState = constructorReducer(
      initialState,
      deleteIngredient(mockIngredient1)
    );
    const arrayIngredients = newState.constructorItems.ingredients.length;
    expect(arrayIngredients).toBe(0);
    expect(newState.constructorItems.ingredients).toEqual([]);
  });
  test('перемещение ингредиента вверх', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };

    expect(initialState.constructorItems.ingredients[0]).toEqual(
      mockIngredient1
    );
    expect(initialState.constructorItems.ingredients[1]).toEqual(
      mockIngredient2
    );

    const newState = constructorReducer(initialState, moveIngredientUp(1));

    expect(newState.constructorItems.ingredients[0]).toEqual(mockIngredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(mockIngredient1);
  });

  test('перемещение ингредиента вниз', () => {
    const initialState: ConstructorState = {
      constructorItems: {
        bun: null,
        ingredients: [mockIngredient1, mockIngredient2]
      }
    };

    const newState = constructorReducer(initialState, moveIngredientDown(0));
    expect(newState.constructorItems.ingredients[0]).toEqual(mockIngredient2);
    expect(newState.constructorItems.ingredients[1]).toEqual(mockIngredient1);
  });
});
