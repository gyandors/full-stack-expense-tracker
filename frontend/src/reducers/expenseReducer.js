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

    deleteExpense: (state, action) => {
      state.expenseItems = state.expenseItems.filter(
        (e) => e.id !== action.payload
      );
    },
  },
});

export const { getExpense, addExpense, deleteExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
