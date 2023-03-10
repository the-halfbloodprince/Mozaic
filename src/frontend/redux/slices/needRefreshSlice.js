import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const needRefreshSlice = createSlice({
    name: 'needRefresh',
    initialState,
    reducers: {
        setNeedRefresh: (state, action) => { state = action.payload }
    }
})

export const { setNeedRefresh } = needRefreshSlice.actions

export default needRefreshSlice.reducer