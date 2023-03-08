import React, { useState, useEffect, useContext } from 'react';
import styles from './Profile.module.css';
import {
    Link
} from "react-router-dom";
import moment from 'moment'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import NFTCard from './NFTCard';
import { FaShareAlt as ShareIcon, FaEllipsisH as SeeMoreIcon } from 'react-icons/fa'
import { MdContentCopy as CopyIcon, MdDateRange as CalendarIcon, MdModeEditOutline as EditIcon } from 'react-icons/md'
import { BiLinkAlt as LinkIcon } from 'react-icons/bi'
import Loading from './AwaitingConnection';
import { PuffLoader as LoaderAnim } from 'react-spinners'
import { toast } from 'react-toastify';
import { ethers } from "ethers";
import axios from "axios";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { accountContext, marketplaceContext, myNFTsContext, needrefreshContext, nftContext, NFTsContext } from '../contexts/contexts';
// import { Text } from '@mantine/core';

// import { BsCalendar2DateFill as DateIcon } from 'react-icons/bs'

const MAX_LEN = 20
const MAX_RATING = 5

const trim = (str, len) => {
    return str.substr(0, MAX_LEN - 1) + '...'
}

const NoUserScreen = () => (
    <div>
        Please log in to see your profile
    </div>
)

// const YourNFTsData = [
//     {
//         name: "Hilale varade",
//         price: 0.007,
//         img: "/images/card_image1.jpg"
//     },
//     {
//         name: "Mustafa Varade",
//         price: 0.003,
//         img: "/images/card_image1.jpg"
//     },
//     {
//         name: "Jalalludin Varade",
//         price: 0.002,
//         img: "/images/card_image1.jpg"
//     },
//     {
//         name: "Hitler Varade",
//         price: 0.005,
//         img: "/images/card_image1.jpg"
//     },
//     {
//         name: "Lolita Varade",
//         price: 0.010,
//         img: "/images/card_image1.jpg"
//     },
//     {
//         name: "Mia Varade",
//         price: 0.009,
//         img: "/images/card_image1.jpg"
//     },
//     {
//         name: "Sagar Khalifa",
//         price: 0.01,
//         img: "/images/card_image1.jpg"
//     },
// ]



const YourNFTs = ({ tokens: yourNFTList, showCount = 4, listFunc,unlistFunc = null}) => {

    const [myNFTs, setMyNFTs] = useContext(myNFTsContext)

    return (
        <div className={styles.your_nfts}>
            <div className={styles.your_nfts__heading}>
                <div className={styles.your_nfts__title}>
                    My NFTs
                </div>
            </div>
            <div className={styles.your_nfts__cards}>
                {
                    myNFTs
                        // .slice(0, 4)
                        .map((nft, idx) => <NFTCard key={nft.itemId} nft={nft} actionText={nft.onSale ? 'Unlist' : 'List for sale'} actionFunc={ nft.onSale ? (() => unlistFunc(nft.itemId)) : (() => listFunc(nft.itemId)) } />)
                }
            </div>
        </div>
    )

}

const YourTransactions = () => (
    <div>
        Transactions
    </div>
)

// const activeSections = {
//     "Your NFTs": <YourNFTs yourNFTList={YourNFTsData} />,
//     "Your Transactions": <YourTransactions />,
// }

const ProfilePage = () => {

    const [NFTs, setNFTs] = useState([]);
    const [nft, setnft] = useContext(nftContext);
    const [marketplace, setMarketplace] = useContext(marketplaceContext);
    const [account, setAccount] = useContext(accountContext);
    const [needRefresh, setNeedRefresh] = useContext(needrefreshContext);


    
    // useEffect(() => {
    //     loadTokens();
        
    // }, []);

    const [opened, { open, close }] = useDisclosure(false);
    const [price, setPrice]  = useState(0.12)

    const [nftId, setNftId] = useState(null)

    const handleListForSale = (itemId, ) => {
        open()
        setNftId(itemId)
    }

    const handlePriceSubmit = () => {
        close()
        // TODO: show loading
        listNFT(price, nftId)
    }

    const listNFT = async (price, itemId) => {

    console.log(`${itemId} listed for sale`)

        // show modal

        // get price

        try {
        // const id = await nft.tokenCount();
        const listingPrice = ethers.utils.parseEther(price.toString());
        console.log(listingPrice)
        await (await marketplace.listItem(itemId, listingPrice)).wait();
        setNeedRefresh(true)
        notifications.show({
            withCloseButton: true,
            loading: false,
            color: 'lime',
            title: 'NFT Listed',
            message: 'Successfully listed your NFT!'
          })
    } catch (e) {
        notifications.show({
            color: 'red',
            title: 'Upload error',
            message: e
          })
        }
    };

    const unlistNFT = async (itemId)=>{
        try {
            
            await (await marketplace.unlistItem(itemId)).wait();
            setNeedRefresh(true)
            notifications.show({
                withCloseButton: true,
                loading: false,
                color: 'lime',
                title: 'NFT Unlisted',
                message: 'Successfully unlisted your NFT!'
              })
        } catch (e) {
            notifications.show({
                color: 'red',
                title: 'Upload error',
                message: e
              })
        }
    }

    // --------------------

    const [activeSection, setActiveSection] = useState('Your NFTs')

    const name = 'Sagar Hitler Varade'
    const walletAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'

    const joined = moment(new Date())
    const website = 'https://sexystuff.io'

    const rating = 4


    return (
        <div>
            <Modal className={styles.Floating} opened={opened} onClose={close} title="List NFT for Sale" centered >
                <div className={styles.modalContainer}>
                    <Title order={1} color="white">American Boy</Title>
                    <div className={styles.modaldescription}>
                    Captain America is the best avenger. He is the fricking American Boy...
                    </div>
                    <input className={styles.modalinput} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <div className={styles.modaldescription2}>
                    Recommended price is <strong> 0.12 ETH</strong>
                    </div>
                    <button className={styles.modalbutton} onClick={handlePriceSubmit}>Place For Sale!</button>
                </div>
            </Modal>
            <img className={styles.overlay} src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677944863/cinematic_1_m9jygb.jpg"/>
            <div className={styles.profileHeader}>
                <div className={styles.info}>
                    <img src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/hitler_as_a_modern_hipster_evsecp.jpg" alt="" />
                    <div className={styles.info__txt}>
                        <div className={styles.name}> { name } </div>
                        <CopyToClipboard text={walletAddress} onCopy={() => toast('Public Key copied to the clipboard')} >
                            <div className={styles.walletAddress}>
                                <div className={styles.walletAddress__icon}><CopyIcon /></div>
                                <div className={styles.walletAddress__addr}> { trim(walletAddress) } </div>
                            </div>
                        </CopyToClipboard>
                        <div className={styles.joined}>
                            <div className={styles.joined__icon}><CalendarIcon /></div>
                            <div className={styles.joined__txt}> Joined on {joined.format('MMMM YYYY')} </div>
                        </div>
                        <div className={styles.website}>
                            <div className={styles.website__icon}><LinkIcon /></div>
                            <Link to={website} target='_blank'><div className={styles.website__txt}>{website}</div></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.actions}>
                        <ShareIcon />
                        <SeeMoreIcon />
                        <EditIcon className='disabled' />
                    </div>
                    {/* <div className={styles.rating}>
                        <div className={styles.rating__text}>Rating: </div>
                        <div className={styles.rating__icons}>
                            {Array(rating).fill(0).map(() => (<span>F</span>))}
                            {Array(MAX_RATING - rating).fill(0).map(() => (<span>L</span>))}
                        </div>
                    </div> */}
                </div>
            </div>

            <hr className={styles.separator} />
            {/* <div className={styles.separator}></div> */}

            <div className={styles.toggleBtns}>
                <button className={`${styles.toggleBtn} ${activeSection === 'Your NFTs' && styles.activeBtn}`} onClick={() => setActiveSection('Your NFTs')}>My NFTs</button>
                <div className={`${styles.toggleBtn} ${activeSection === 'Your Transactions' && styles.activeBtn}`} onClick={() => setActiveSection('Your Transactions')}>My Transactions</div>
            </div>

            {/* { activeSections[activeSection] } */}

            {(activeSection === 'Your NFTs') && <YourNFTs tokens={NFTs} listFunc={ handleListForSale } unlistFunc = {unlistNFT} /> }
            
        </div>
    )

}

const Profile = ({ nft, marketplace, account }) => {

    return account ? (
        <ProfilePage nft={nft} marketplace={marketplace} account={account} />        
    ) : <Loading loadingText='Login to see your profile' loadingIcon={<LoaderAnim color='#B0F122'/>} />
  }
  
  export default Profile