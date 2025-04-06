import {createSlice} from "@reduxjs/toolkit";



const countSlice = createSlice({
  name: 'count',
  initialState: {
    count: 0,
    loading: false,
    error: null,
  },
  reducers: {
    increment(state, action) {
      state.count = state.count + action.payload;
    },
    decrement(state, action) {
       state.count -= action.payload;
    },
    updateLoading(state, action) {
      state.loading = action.payload;
    }
  },
});

export const { increment, decrement,updateLoading } = countSlice.actions;

export default countSlice.reducer;


export const incrementAsync = (amount) => (dispatch) => {
  dispatch(updateLoading(true));
  setTimeout(() => {
    dispatch(updateLoading(false));
    dispatch(increment(amount));
  }, 1000);
}

export const decrementAsync = (amount) => (dispatch) => {
  dispatch(updateLoading(true));
  setTimeout(() => {
    dispatch(updateLoading(false));
    dispatch(decrement(amount));
  }, 1000);
}

