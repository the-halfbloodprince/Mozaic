import { createSlice } from '@reduxjs/toolkit'

const initState = null

export const nftSlice = createSlice({
    name: 'nft',
    initState,
    reducers: {
        setNft: (_, action) => { state = action.payload }
    }
})

export const { setNft } = nftSlice.actions

export default nftSlice.reducer