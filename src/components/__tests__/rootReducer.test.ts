import { rootReducer } from '../../services/store';
import { initialState as constructorInitialState } from '../../services/slices/constructorSlice';
import { initialState as ingredientsInitialState } from '../../services/slices/ingredientsSlice';
import { initialState as orderInitialState } from '../../services/slices/orderSlice';
import { initialState as userInitialState } from '../../services/slices/userSlice';
import { initialState as feedsInitialState } from '../../services/slices/feedSlice';
import {  describe, expect, test } from '@jest/globals';
const expectedInitialState = {
  burgerConstructor: constructorInitialState,
  ingredients: ingredientsInitialState,
  order: orderInitialState,
  user: userInitialState,
  feeds: feedsInitialState
};

describe('rootReducer', () => {
  test('должен возвращать корректное начальное состояние при инициализации с undefined состоянием и unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(expectedInitialState);
  });
});
