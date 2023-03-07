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
import { useContext, useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'
import Footer from './Footer';
import { ToastContainer  } from 'react-toastify';
import styles from './App.module.css';
import { accountContext, marketplaceContext, nftContext } from "../contexts/accountContext";
import NFTProductScreen from "./NFTProductScreen";
import Loading from "./AwaitingConnection";

function App() {

  const [account, setAccount] = useContext(accountContext)

  // const [loading, setLoading] = useState(true)
  // const [account, setAccount] = useState(null)
  const [nft, setNFT] = useContext(nftContext)
  const [marketplace, setMarketplace] = useContext(marketplaceContext)
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
    setAccount(accounts[0])
  }
  const loadContracts = async (signer) => {
    // Get deployed copies of contracts
    const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    setMarketplace(marketplace)
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    setNFT(nft)
    // setLoading(false)
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
