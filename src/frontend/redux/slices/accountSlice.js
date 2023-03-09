import { createSlice } from '@reduxjs/toolkit'

const initState = null

export const accountSlice = createSlice({
    name: 'account',
    initState,
    reducers: {
        setAccount: (_, action) => { state = action.payload }
    }
})

export const { setAccount } = accountSlice.actions

export default accountSlice.reducer