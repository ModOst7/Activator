import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RootState = {
  isOpenUserMenu: boolean;
  isVisibleQuestion: boolean;
};

const initialState: RootState = {
  isOpenUserMenu: false,
  isVisibleQuestion: false,
};

export const model = createSlice({
  name: "headerModel",
  initialState,
  reducers: {
    setOpenMenuUser: (state, action: PayloadAction<boolean>) => {
      state.isOpenUserMenu = action.payload;
    },
    setVisibleQuestion: (state, action: PayloadAction<boolean>) => {
      state.isVisibleQuestion = action.payload;
    },
    reset: (state) => {
      state.isOpenUserMenu = false;
      state.isVisibleQuestion = false;
    },
  },
});

export const { setOpenMenuUser, setVisibleQuestion, reset } = model.actions;

export default model.reducer;
