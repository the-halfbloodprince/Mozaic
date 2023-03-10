import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const NFTsSlice = createSlice({
    name: 'NFTs',
    initialState,
    reducers: {
        setNFTs: (state, action) => { state = action.payload }
    }
})

export const { NFTs } = NFTsSlice.actions

export default NFTsSlice.reducer