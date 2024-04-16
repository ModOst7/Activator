import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISearchElement {
  id: number;
  name: string;
  date: string;
  tags?: string[];
  vendor_code?: string;
}

type RootState = {
  isVisibleHistory: boolean;
  trainersData: ISearchElement[];
  allTrainersData: ISearchElement[];
  filter: string;
  history: string[];
  datetimeStart: Date | undefined;
  datetimeEnd: Date | undefined;
};

const initialState: RootState = {
  isVisibleHistory: false,
  trainersData: [],
  allTrainersData: [],
  filter: "",
  history: [],
  datetimeStart: undefined,
  datetimeEnd: new Date(),
};

export const model = createSlice({
  name: "searchModel",
  initialState,
  reducers: {
    setVisibleHistory: (state, action: PayloadAction<boolean>) => {
      state.isVisibleHistory = action.payload;
    },
    setTrainerData: (state, action: PayloadAction<ISearchElement[]>) => {
      state.trainersData = action.payload;
    },
    setAllTrainersData: (state, action: PayloadAction<ISearchElement[]>) => {
      state.allTrainersData = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setHistory: (state, action: PayloadAction<string[]>) => {
      state.history = action.payload;
    },
    setDatetimeStart: (state, action: PayloadAction<Date | undefined>) => {
      state.datetimeStart = action.payload;
    },
    setDatetimeEnd: (state, action: PayloadAction<Date | undefined>) => {
      state.datetimeEnd = action.payload;
    },
  },
});

export const {
  setVisibleHistory,
  setTrainerData,
  setAllTrainersData,
  setFilter,
  setHistory,
  setDatetimeStart,
  setDatetimeEnd,
} = model.actions;

export default model.reducer;
