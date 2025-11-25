import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

//экшн

export const getFeeds = createAsyncThunk('order/getFeeds', async () => {
  const res = await getFeedsApi();
  return res;
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);
    return res.orders;
  }
);

export interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  previewOrder: TOrder | null;
}

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  previewOrder: null
};

// Slice
const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.isLoading = false;
        state.previewOrder = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.previewOrder = action.payload[0];
        state.isLoading = false;
      });
  },
  selectors: {
    selectFeedState: (state) => state,
    selectFeedsOrders: (state) => state.orders,
    selectFeedsTotal: (state) => state.total,
    selectFeedsTotalToday: (state) => state.totalToday,
    selectFeedsLoading: (state) => state.isLoading,
    selectPreviewOrder: (state) => state.previewOrder
  }
});
export const feedsReducer = feedsSlice.reducer;

export const {
  selectFeedsOrders,
  selectFeedsTotal,
  selectFeedsTotalToday,
  selectFeedsLoading,
  selectFeedState,
  selectPreviewOrder
} = feedsSlice.selectors;
