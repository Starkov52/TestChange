import { createSlice } from "@reduxjs/toolkit";
type LikeCurrency = {
    currencyName: string,
    currencyValue: number,
    currencyDateInitialization: string
}
type UserData = {
    userCurrency: string,
    userLikeCurrency: LikeCurrency[] | null
}

const state:UserData = {
    userCurrency: 'BYN',
    userLikeCurrency: null
}
const userData = createSlice({
    name: 'data',
    initialState: state,
    reducers: ({
    })
})
export default userData.reducer