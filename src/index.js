import { render } from "react-dom";
import App from './frontend/components/App';
import './frontend/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from '@mantine/core';
import * as serviceWorker from './serviceWorker';
import { accountContext,  NFTsContext, nftContext, marketplaceContext, myNFTsContext, needrefreshContext,transactionsContext } from './frontend/contexts/contexts'
import React, { useState } from 'react'
import { Notifications } from '@mantine/notifications';

const rootElement = document.getElementById("root");

const MainApp = () => {
    
    const [account, setAccount] = useState(null)
    const [NFTs, setNFTs] = useState([])
    const [nft, setnft] = useState({})
    const [marketplace, setMarketplace] = useState({})
    const [myNFTs, setMyNFTs] = useState([])
    const [needRefresh, setNeedRefresh] = useState(false)
    const [transactions, setTransactions] = useState([])

    return (
        <needrefreshContext.Provider value={[needRefresh, setNeedRefresh]}>
        <accountContext.Provider value={[account, setAccount]}>
            <marketplaceContext.Provider value={[marketplace, setMarketplace]}>
                <nftContext.Provider value={[nft, setnft]}>
                    <NFTsContext.Provider value={[NFTs, setNFTs]}>
                        <transactionsContext.Provider value = {[transactions, setTransactions]}>
                            <myNFTsContext.Provider value={[myNFTs, setMyNFTs]}>
                                <MantineProvider theme={{ colorScheme: 'dark' }}>
                                    <Notifications />
                                    <App />
                                </MantineProvider>
                            </myNFTsContext.Provider>
                        </transactionsContext.Provider>
                    </NFTsContext.Provider>
                </nftContext.Provider>
            </marketplaceContext.Provider>
        </accountContext.Provider>
        </needrefreshContext.Provider>
    )
}

render( 
    <MainApp />
, rootElement);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();