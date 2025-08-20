import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";
type LikeCurrency = {
     name: string;
     value: string;
     isLike: boolean;
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
          },
          addLikeCurrency: (
               state,
               action: PayloadAction<{ newLikeCurr: { name: string; value: string } }>
          ) => {
               if (Array.isArray(state.userLikeCurrency)) {
                    state.userLikeCurrency = [
                         ...state.userLikeCurrency,
                         {
                              name: action.payload.newLikeCurr.name,
                              value: action.payload.newLikeCurr.value,
                              isLike: true
                         }
                    ];
               } else {
                    state.userLikeCurrency = [];
                    state.userLikeCurrency = [
                         ...state.userLikeCurrency,
                         {
                              name: action.payload.newLikeCurr.name,
                              value: action.payload.newLikeCurr.value,
                              isLike: true
                         }
                    ];
               }
          }
     }
});
export default userData.reducer;
export const { changeDefaultCurrency, addLikeCurrency } = userData.actions;
