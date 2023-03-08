import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavBar from './Navbar';
import Marketplace from './Marketplace.js'
import LandingPage from './LandingPage.js'
import Create from './Create.js'
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
import { accountContext, marketplaceContext, nftContext, NFTsContext, myNFTsContext, needrefreshContext } from "../contexts/contexts";
import NFTProductScreen from "./NFTProductScreen";
import Loading from "./AwaitingConnection";
import axios from "axios";

function App() {

  const [needRefresh, setNeedRefresh] = useContext(needrefreshContext)
  const [account, setAccount] = useContext(accountContext)
  const [nft, setNFT] = useContext(nftContext)
  const [marketplace, setMarketplace] = useContext(marketplaceContext)

  const [NFTs, setNFTs] = useContext(NFTsContext)
  const [myNFTs, setMyNFTs] = useContext(myNFTsContext)

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
      if (token.seller.toLowerCase() === account) {
          // get uri url from nft contract
          const tokenURI = await nft.tokenURI(token.tokenId);
          console.log(tokenURI);
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
            name: metadata.name,
            description: metadata.description,
            image: imageURL,
            category: metadata.category,
            totalPrice,
            onSale : token.onSale,
          };
          console.log(item);
          myItems.push(item);
      }

      if (token.onSale) {
        const tokenURI = await nft.tokenURI(token.tokenId);
        // console.log(tokenURI);
        let url = tokenURI.split("//");
        // console.log(url[1]);
        let axiosURL = "https://ipfs.io/ipfs/" + url[1];
        // console.log(axiosURL);
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
          image: imageURL,
          category: metadata.category,
          price: token.price,
          onSale: token.onSale,
          totalPrice,
        };
        items.push(item);
      }
    }

    setNFTs(items);
    setMyNFTs(myItems);
  };

  // const loadTokens = async () => {
  //     // Load all sold items that the user listed
  //     const itemCount = NFTs.length();
  //     // console.log(itemCount.toNumber());
  //     let myItems = [];
  //     // let soldItems = [];
  //     for (let indx = 1; indx <= itemCount; indx++) {
  //     const i = NFTs[indx];
  //     //   console.log(i);
  //     if (i.seller.toLowerCase() === account) {
  //         // get uri url from nft contract
  //         const tokenURI = await nft.tokenURI(i.tokenId);
  //         console.log(tokenURI);
  //         let url = tokenURI.split("//");
  //         console.log(url[1]);
  //         let axiosURL = "https://ipfs.io/ipfs/" + url[1];
  //         console.log(axiosURL);
  //         let meta = await axios.get(axiosURL);
  //         let metadata = meta.data;
  //         console.log(metadata);

  //         let imageURL = "https://ipfs.io/ipfs/" + metadata.image.split("//")[1];
  //         const totalPrice = await marketplace.getTotalPrice(i.itemId);
      
  //         let item = {
  //         itemId: i.itemId,
  //         name: metadata.name,
  //         description: metadata.description,
  //         image: imageURL,
  //         totalPrice,
  //         onSale : i.onSale,
  //         };
  //         myItems.push(item);
  //         // console.log()
  //     }
  //     }
      
  //     setNFTs(myItems);
  //     // console.log(tokens);
  // };

  useEffect(() => {

      loadMarketplaceItems()

  }, [marketplace, nft, account])

  // useEffect(() => {
  //   loadTokens()
  // })

  if (needRefresh) {

      loadMarketplaceItems()
      setNeedRefresh(false)
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
                <Route path="/my-listed-items" element={
                  <MyListedItems marketplace={marketplace} nft={nft} account={account} />
                } />
                <Route path="/my-purchases" element={
                  <MyPurchases marketplace={marketplace} nft={nft} account={account} />
                } />
                <Route path="/profile" element={
                  <Profile nft={nft} marketplace={marketplace} account={account} />
                }/>
                <Route path="/nft" element={
                  <NFTProductScreen />
                }/>
                <Route path="/createnft" element={
                  <createnft account={account} />
                }
                />
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
