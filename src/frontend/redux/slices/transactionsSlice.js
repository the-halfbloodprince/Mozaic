import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => { state = action.payload }
    }
})

export const { setTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer