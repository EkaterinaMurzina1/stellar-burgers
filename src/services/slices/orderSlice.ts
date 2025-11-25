// services/slices/orderSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import {
  orderBurgerApi,
  getOrderByNumberApi,
  getOrdersApi,
  getFeedsApi
} from '@api';
import { getCookie } from '../../utils/cookie';
export interface TOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectOrdersModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
    // .addCase(createOrder.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.error.message || 'Не удалось создать заказ';
    // })
  }
});
export const orderReducer = orderSlice.reducer;
export const { clearOrderModalData } = orderSlice.actions;

export const { selectOrderRequest, selectOrdersModalData } =
  orderSlice.selectors;
