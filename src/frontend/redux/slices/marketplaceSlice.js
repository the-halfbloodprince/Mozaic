import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const marketplaceSlice = createSlice({
    name: 'marketplace',
    initialState,
    reducers: {
        setMarketplace: (state, action) => { state = action.payload }
    }
})

export const { setMarketplace } = marketplaceSlice.actions

export default marketplaceSlice.reducer