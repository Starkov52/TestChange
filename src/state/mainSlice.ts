import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
type LikeCurrency = {
     currencyName: string;
     currencyValue: number;
     currencyDateInitialization: string;
};
type UserData = {
     userCurrency: string;
     userLikeCurrency: LikeCurrency[] | null;
};

const state: UserData = {
     userCurrency: "BYN",
     userLikeCurrency: null
};
const userData = createSlice({
     name: "data",
     initialState: state,
     reducers: {
          changeDefaultCurrency: (state, action: PayloadAction<{ newCurr: string }>) => {
               return { ...state, userCurrency: action.payload.newCurr };
          }
     }
});
export default userData.reducer;
export const { changeDefaultCurrency } = userData.actions;
