import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const nftSlice = createSlice({
    name: 'nft',
    initialState,
    reducers: {
        setNft: (state, action) => { state = action.payload }
    }
})

export const { setNft } = nftSlice.actions

export default nftSlice.reducer