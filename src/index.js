import { render } from "react-dom";
import App from './frontend/components/App';
import './frontend/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { MantineProvider } from '@mantine/core';
import * as serviceWorker from './serviceWorker';
import { accountContext,  NFTsContext, nftContext, marketplaceContext } from './frontend/contexts/accountContext'
import React, { useState } from 'react'

const rootElement = document.getElementById("root");

const MainApp = () => {
    
    const [account, setAccount] = useState(null)
    const [NFTs, setNFTs] = useState([])
    const [nft, setnft] = useState({})
    const [marketplace, setMarketplace] = useState({})

    return (
        <accountContext.Provider value={[account, setAccount]}>
            <NFTsContext.Provider value={[NFTs, setNFTs]}>
                <nftContext.Provider value={[nft, setnft]}>
                    <marketplaceContext.Provider value={[marketplace, setMarketplace]}>
                        <MantineProvider>
                        <App />
                    </MantineProvider>
                    </marketplaceContext.Provider>
                </nftContext.Provider>
            </NFTsContext.Provider>
        </accountContext.Provider>
    )
}

render( 
    <MainApp />
, rootElement);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();