import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const myNFTsSlice = createSlice({
    name: 'myNFTs',
    initialState,
    reducers: {
        setMyNFTs: (state, action) => { state = action.payload }
    }
})

export const { setMyNFTs } = myNFTsSlice.actions

export default myNFTsSlice.reducer