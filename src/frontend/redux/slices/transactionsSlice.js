import { createSlice } from '@reduxjs/toolkit'

const initState = []

export const transactionsSlice = createSlice({
    name: 'transactions',
    initState,
    reducers: {
        setTransactions: (_, action) => { state = action.payload }
    }
})

export const { setTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer