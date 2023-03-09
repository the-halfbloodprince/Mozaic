import { createSlice } from '@reduxjs/toolkit'

const initState = []

export const NFTsSlice = createSlice({
    name: 'NFTs',
    initState,
    reducers: {
        setNFTs: (_, action) => { state = action.payload }
    }
})

export const { NFTs } = NFTsSlice.actions

export default NFTsSlice.reducer