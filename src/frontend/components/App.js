import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './Navbar';
import Marketplace from './Marketplace.js'
import LandingPage from './LandingPage.js'
import Create from './Create.js'
import Transactions from './Transactions.js'
import Profile from './Profile.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import createnft from './createnft'
import { useContext, useEffect, useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import Footer from './Footer';
import { ToastContainer  } from 'react-toastify';
import styles from './App.module.css';
import { accountContext, marketplaceContext, nftContext, NFTsContext, myNFTsContext, needrefreshContext, transactionsContext } from "../contexts/contexts";
import NFTProductScreen from "./NFTProductScreen";
import Loading from "./AwaitingConnection";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import CreatePage from "./CreatePage2";

function App() {

  const [needRefresh, setNeedRefresh] = useContext(needrefreshContext)
  const [account, setAccount] = useContext(accountContext)
  const [nft, setNFT] = useContext(nftContext)
  const [marketplace, setMarketplace] = useContext(marketplaceContext)

  const [NFTs, setNFTs] = useContext(NFTsContext)
  const [myNFTs, setMyNFTs] = useContext(myNFTsContext)
  const [transactions, setTransactions] = useContext(transactionsContext);

  // MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    })

    window.ethereum.on('accountsChanged', async function (accounts) {
      setAccount(accounts[0])
      await web3Handler()
    })
    await loadContracts(signer)
    // loadMarketplaceItems()
    setAccount(accounts[0])
  }

  // load contracts
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    // setLoading(false)
  }

  // load NFTs
  const loadMarketplaceItems = async () => {

    // setNFTs(...NFTs, { loading: true })

    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    
    console.log(itemCount.toNumber());
    
    let items = [];
    let myItems = []
    

    for (let i = 1; i <= itemCount; i++) {
      const token = await marketplace.items(i);
      // console.log(token);
      // console.log(token.tokenId);
      const tokenURI = await nft.tokenURI(token.tokenId);
      // console.log(tokenURI);
      let url = tokenURI.split("//");
      console.log(url[1]);
      let axiosURL = "https://ipfs.io/ipfs/" + url[1];
      console.log(axiosURL);
      let meta = await axios.get(axiosURL);
      let metadata = meta.data;
      console.log(metadata);

      let imageURL = "https://ipfs.io/ipfs/" + metadata.image.split("//")[1];
      const totalPrice = await marketplace.getTotalPrice(token.itemId);
      let item = {
        itemId: token.itemId,
        seller: token.seller,
        name: metadata.name,
        description: metadata.description,
        category: metadata.category,
        image: imageURL,
        price: token.price,
        onSale: token.onSale,
        totalPrice,
      };
      if (token.seller.toLowerCase() === account) {
    
        console.log(item);
        myItems.push(item);
      }

      if (token.onSale) {
        
        items.push(item);
      }
    }

    setNFTs(items);
    setMyNFTs(myItems);


    const transactionCount = await marketplace.transactionCount();
    console.log(transactionCount.toNumber());
    let transactionItems = [];

    for (let i = 1; i <= transactionCount; i++){
      const currentTransaction = await marketplace.transactions(i);
      // console.log(token);
      // console.log(token.tokenId);
      const tokenURI = await nft.tokenURI(currentTransaction.tokenId);
      // console.log(tokenURI);
      let url = tokenURI.split("//");
      console.log(url[1]);
      let axiosURL = "https://ipfs.io/ipfs/" + url[1];
      console.log(axiosURL);
      let meta = await axios.get(axiosURL);
      let metadata = meta.data;
      // console.log(metadata);

      let tsc = {
        transactionId: currentTransaction.transactionCount,
        from: currentTransaction.from,
        to: currentTransaction.to,
        amount : currentTransaction.amount,
        timestamp: currentTransaction.timestamp,
        nftName:metadata.name,
        
      }
      transactionItems.push(tsc);
    }
    setTransactions(transactionItems);
  };

  

  useEffect(() => {

      loadMarketplaceItems()

  }, [marketplace, nft, account])

  // useEffect(() => {
  //   loadTokens()
  // })

  const refresh = async () => {
      notifications.show({
        id: 'fetching-nfts',
        color: 'lime',
        title: 'Fetching NFTs',
        message: 'Fetching NFTs',
        loading: true
      })
      setNeedRefresh(false)
      await loadMarketplaceItems()
      notifications.hide('fetching-nfts')
      notifications.show({
        color: 'lime',
        title: 'Fetched NFTs',
        message: 'Fetched NFTs',
        // loading: true
      })

  }

  if (needRefresh) {
      refresh()
  }

  return (
    <BrowserRouter>
      <div className={styles.main}>
        <>
          <NavBar web3Handler={web3Handler} account={account} />
        </>
        {
          account ? (
              <main className={styles.main}>
              <Routes>
                <Route path="/" element={
                  <LandingPage />
                } />
                <Route path="/marketplace" element={
                  <Marketplace />
                } />
                <Route path="/create" element={
                  <Create marketplace={marketplace} nft={nft} />
                } />
                {/* <Route path="/my-listed-items" element={
                  <MyListedItems marketplace={marketplace} nft={nft} account={account} />
                } /> */}
                {/* <Route path="/my-purchases" element={
                  <MyPurchases marketplace={marketplace} nft={nft} account={account} />
                } /> */}
                <Route path="/profile" element={
                  <Profile nft={nft} marketplace={marketplace} account={account} />
                }/>
                <Route path="/nft" element={
                  <NFTProductScreen />
                }/>
                {/* <Route path="/createnft" element={
                  <createnft account={account} />
                }/> */}
                <Route path="/transactions" element={
                  <Transactions />
                }/>
                <Route path="/create-2" element={
                  <CreatePage />
                }/>
              </Routes>
            {/* )} */}
            <ToastContainer
              theme="dark"
              position="bottom-right"
              hideProgressBar={true}
              closeOnClick
              autoClose={2000}
            />
          </main>
          ) : (
            <Loading />
          )
        }
        <Footer/>
      </div>
    </BrowserRouter>

  );
}

export default App;
