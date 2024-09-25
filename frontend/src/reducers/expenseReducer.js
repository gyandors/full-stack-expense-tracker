import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenseItems: [],
  totalExpense: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getExpense: (state, action) => {
      state.expenseItems = action.payload;
    },

    addExpense: (state, action) => {
      const expenseData = action.payload;
      state.expenseItems.push(expenseData);
    },
  },
});

export const { getExpense, addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
