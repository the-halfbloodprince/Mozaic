import { configureStore } from '@reduxjs/toolkit'
import accountReducer from './slices/accountSlice'
import marketplaceReducer from './slices/maretplaceSlice'
import nftReducer from './slices/nftSlice'
import NFTsReducer from './slices/NFTsSlice'
import myNFTsReducer from './slices/myNFTsSlice'
import needRefreshReducer from './slices/needRefreshSlice'
import transactionsReducer from './slices/transactionsSlice'

export const store = configureStore({
    reducer: {
        'account': accountReducer,
        'marketplace': marketplaceReducer,
        'nft': nftReducer,
        'NFTs': NFTsReducer,
        'myNFTs': myNFTsReducer,
        'needRefresh': needRefreshReducer,
        'transactions': transactionsReducer,
    }
})