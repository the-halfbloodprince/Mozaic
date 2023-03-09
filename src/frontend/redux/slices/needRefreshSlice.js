import { createSlice } from '@reduxjs/toolkit'

const initState = false

export const needRefreshSlice = createSlice({
    name: 'needRefresh',
    initState,
    reducers: {
        setNeedRefresh: (_, action) => { state = action.payload }
    }
})

export const { setNeedRefresh } = needRefreshSlice.actions

export default needRefreshSlice.reducer