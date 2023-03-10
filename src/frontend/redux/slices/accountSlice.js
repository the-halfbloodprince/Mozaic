import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => { state = action.payload }
    }
})

export const { setAccount } = accountSlice.actions

export default accountSlice.reducer