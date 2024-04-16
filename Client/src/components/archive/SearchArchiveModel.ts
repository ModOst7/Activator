import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISearchArchiveElement {
  id: number | string;
  category: string;
  name: string;
  date: Date;
  isChecked?: boolean | undefined;
}
 
type RootState = {
  archiveData: ISearchArchiveElement[];
  allArchiveData: ISearchArchiveElement[];
  filter: string;
  sortingByCategory: boolean | undefined;
  sortingByName: boolean;
  sortingByDate: boolean;
  datetimeStart: Date | undefined;
  datetimeEnd: Date | undefined;
};

const initialState: RootState = {
  archiveData: [],
  allArchiveData: [],
  filter: "",
  sortingByCategory: undefined,
  sortingByName: false,
  sortingByDate: false,
  datetimeStart: undefined,
  datetimeEnd: new Date(),
};

export const model = createSlice({
  name: "searchArchiveModel",
  initialState,
  reducers: {
    setSortingByCategory: (state, action: PayloadAction<boolean | undefined>) => {
        state.sortingByCategory = action.payload;
      },
    setSortingByName: (state, action: PayloadAction<boolean>) => {
        state.sortingByName = action.payload;
      },
    setSortingByDate: (state, action: PayloadAction<boolean>) => {
        state.sortingByDate = action.payload;
    },
    setArchiveData: (state, action: PayloadAction<ISearchArchiveElement[]>) => {
      state.archiveData = action.payload;
    },
    setAllArchiveData: (state, action: PayloadAction<ISearchArchiveElement[]>) => {
      state.allArchiveData = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
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
  setDatetimeStart,
  setDatetimeEnd,
  setArchiveData,
  setAllArchiveData,
  setFilter,
  setSortingByCategory,
  setSortingByName,
  setSortingByDate,
} = model.actions;

export default model.reducer;