import { createSlice } from '@reduxjs/toolkit'

const initState = []

export const myNFTsSlice = createSlice({
    name: 'myNFTs',
    initState,
    reducers: {
        setMyNFTs: (_, action) => { state = action.payload }
    }
})

export const { setMyNFTs } = myNFTsSlice.actions

export default myNFTsSlice.reducer