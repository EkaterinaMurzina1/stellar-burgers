// services/slices/constructorSlice.ts
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export interface ConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: ConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    selectConstructorState: (state) => state,
    selectConstructorItems: (state) => state.constructorItems
  },
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (el) => el.id !== action.payload.id
        );
    },
    clearConstructor: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        const ingredients = state.constructorItems.ingredients;
        const [movedEl] = ingredients.splice(index, 1);
        ingredients.splice(index - 1, 0, movedEl);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index < ingredients.length - 1) {
        const [movedEl] = ingredients.splice(index, 1);
        ingredients.splice(index + 1, 0, movedEl);
      }
    }
  }
});

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  clearConstructor,
  moveIngredientUp,
  moveIngredientDown
} = constructorSlice.actions;

export const { selectConstructorState, selectConstructorItems } =
  constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
