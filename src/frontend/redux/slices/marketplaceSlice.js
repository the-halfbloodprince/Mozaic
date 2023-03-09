import { createSlice } from '@reduxjs/toolkit'

const initState = null

export const marketplaceSlice = createSlice({
    name: 'marketplace',
    initState,
    reducers: {
        setMarketplace: (_, action) => { state = action.payload }
    }
})

export const { setMarketplace } = marketplaceSlice.actions

export default marketplaceSlice.reducer