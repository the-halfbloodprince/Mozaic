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
import { toast } from 'react-toastify';
import { ethers } from "ethers";
import axios from "axios";
import { useClipboard, useDisclosure } from '@mantine/hooks';
import { Modal, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useParams } from 'react-router-dom'
import { accountContext, marketplaceContext, myNFTsContext, needrefreshContext, nftContext, NFTsContext, profileContext } from '../contexts/contexts';
import Transactions from './Transactions';
import { Rating } from '@mantine/core'
import { HOST, SERVER_URL } from '../globals/variables';
import { FetchingProfile, NoAccount } from './LoadingComponents';
// import { Text } from '@mantine/core';

// import { BsCalendar2DateFill as DateIcon } from 'react-icons/bs'

const MAX_LEN = 20
// const MAX_RATING = 5

const trim = (str, len) => {

    if (!str) {
        return ''
    }

    return str.length <= len ? str : (str.substr(0, len - 1) + '...')
}

const NoUserScreen = () => (
    <div>
        Please log in to see your profile
    </div>
)

const YourNFTs = ({ tokens: yourNFTList, profileId, showCount = 4, listFunc,unlistFunc = null}) => {

    const [myNFTs, setMyNFTs] = useContext(myNFTsContext)
    const [NFTs, setNFTs] = useContext(NFTsContext)
    const [account, setAccount] = useContext(accountContext)

    console.log('profileId............................')
    console.log(profileId)

    console.log(NFTs)

    const [NFTsToShow, setNFTsToShow] = useState([])
    // setNFTsToShow(NFTs.filter(n => (n.seller.toLowerCase() === profileId.toLowerCase())))

    useEffect(() => {

        setNFTsToShow(NFTs.filter(n => n.seller.toLowerCase() === profileId.toLowerCase()))

    }, [profileId, NFTs])

    return NFTsToShow.length === 0 ? (
        <div className={styles.noNFTsContainer}>
            No NFTs to show
        </div>
    ) : (
        <div className={styles.your_nfts}>
            {/* <div className={styles.your_nfts__heading}>
                <div className={styles.your_nfts__title}>
                    My NFTs
                </div>
            </div> */}
            <div className={styles.your_nfts__cards}>
                {
                    // myNFTs
                    NFTsToShow
                    // NFTsToShow
                        // .filter(n => (n.seller.toLowerCase() === profileId.toLowerCase()))
                        // .slice(0, 4)
                        .map((nft, idx) => <NFTCard key={nft.itemId} nft={nft} actionText={(profileId.toLowerCase() === account.toLowerCase()) && (nft.onSale ? 'Unlist' : 'List for sale')} actionFunc={ nft.onSale ? (() => unlistFunc(nft)) : (() => listFunc(nft)) } />)
                }
            </div>
        </div>
    )

}

const YourTransactions = ({which}) => (
    <Transactions which={which} />
)

// const activeSections = {
//     "Your NFTs": <YourNFTs yourNFTList={YourNFTsData} />,
//     "Your Transactions": <YourTransactions />,
// }

const ProfilePage = () => {

    const [NFTs, setNFTs] = useState([]);
    // let selectedNFT = 
    const [selectedNFT, setSelectedNFT] = useState({
        name: '',
        description: ''
    })

    const { profileId } = useParams()
    // console.log('profileId: ', profileId)

    const [nft, setnft] = useContext(nftContext);
    const [marketplace, setMarketplace] = useContext(marketplaceContext);
    const [account, setAccount] = useContext(accountContext);
    const [needRefresh, setNeedRefresh] = useContext(needrefreshContext);
    const [profile, setProfile] = useContext(profileContext)

    
    // useEffect(() => {
    //     loadTokens();
        
    // }, []);

    const [opened, { open, close }] = useDisclosure(false);
    const [price, setPrice]  = useState(0.12)

    const [NFT, setNFT] = useState(null)

    const handleListForSale = (nft) => {
        setSelectedNFT(nft)
        open()
        setNFT(nft)
    }

    const handlePriceSubmit = () => {
        close()
        // TODO: show loading
        console.log(NFT)
        listNFT(price, NFT)
    }

    const accountDiff = account.toLowerCase() !== profileId.toLowerCase()

    const listNFT = async (price, NFT) => {

    console.log(`${NFT.itemId} listed for sale`)

        // show modal

        // get price

        try {
        // const id = await nft.tokenCount();
        const listingPrice = ethers.utils.parseEther(price.toString());
        console.log(listingPrice)
            // console.log(NFT.reSale);
            console.log("----------------*-----");
            // console.log(nft.ownerOf(NFT.itemId));
        const currentOwner = await nft.ownerOf(NFT.itemId);
        if(currentOwner != marketplace.address)
        {
            await (await nft.approve(marketplace.address, NFT.itemId)).wait();
        }
        
        await (await marketplace.listItem(NFT.itemId, listingPrice)).wait();
        setNeedRefresh(true)
        notifications.show({
            withCloseButton: true,
            loading: false,
            color: 'lime',
            title: 'NFT listed',
            message: 'Successfully listed your NFT to the marketplace!'
          })
    } catch (e) {
        // notifications.show({
        //     color: 'red',
        //     title: 'Upload error',
        //     message: e
        //   })
        }
    };

    const unlistNFT = async (_nft)=>{
        try {
            const currentOwner = await nft.ownerOf(_nft.itemId);
            if (currentOwner != marketplace.address)
            {
                await (
                  await nft.approve(marketplace.address, _nft.itemId)
                ).wait();
            }
            
            await (await marketplace.unlistItem(_nft.itemId)).wait();
            setNeedRefresh(true)
            notifications.show({
                withCloseButton: true,
                loading: false,
                color: 'lime',
                title: 'NFT Unlisted',
                message: 'Successfully unlisted your NFT!'
              })
        } catch (e) {
            // notifications.show({
            //     color: 'red',
            //     title: 'Upload error',
            //     message: e
            //   })
        }
    }

    // --------------------

    const clipboard = useClipboard()
    // const clipboard = useClipboard()

    const copyProfileLink = () => {
        clipboard.copy(`${HOST}/profile/${profileId}`)
        notifications.show({
            title: 'Profile Link Copied!',
            title: 'Profile link copied to your clipboard',
            color: 'lime'
        })
    }

    const [activeSection, setActiveSection] = useState('Your NFTs')
    const [activeProfile, setActiveProfile] = useState(null)
    const [fetching, setFetching] = useState(true)

    // let coverImageUrl = 'coverImageUrl not specified'
    // let profileImageUrl = 'profileImageUrl not specified'
    // let name = 'name not specified'
    // let walletAddress = 'walletAddress not specified'
    // let description = 'description not specified'
    // let joined = moment()
    // let websiteLink = 'websiteLink not specified'
    // let rating = 'rating not specified'
    
    const fetchProfile = async () => {

        console.log('fetching profile')

        setActiveProfile(null)

        let acttProfile 

        if (profileId == account) {
            acttProfile = profile
        } else {
            // show loading screen
            // fetch profile
            const { data: recievedProfile } = await axios.get(`${SERVER_URL}/profile?walletAddress=${profileId}`)
            // set active profile
            acttProfile = recievedProfile
        }

        console.log('nkm')
        console.log(acttProfile)
        
        setActiveProfile(acttProfile)

        // coverImageUrl = acttProfile.coverImageUrl
        // profileImageUrl = acttProfile.profileImageUrl
        // name = activeProfile ? activeProfile.name : 'nam'
        // walletAddress = profileId
        // description = acttProfile.description ? acttProfile.description : 'full poet possible mean hair quiet apartment factor sentence be shore leg chemical across circle boat specific nation perhaps talk possibly hello waste former'
        // joined = moment(acttProfile.joined)
        // websiteLink = acttProfile.websiteLink ? acttProfile.websiteLink : 'No website link provided'
        // rating = acttProfile.rating.count === 0 ? null : Math.floor(acttProfile.rating.sum / acttProfile.rating.count)

        setFetching(false)

    }

    useEffect(() => {

        fetchProfile()

    }, [profileId])

    console.log('acttt')
    console.log(activeProfile)

    return activeProfile ? (
        <div>
            {/* {
                accountDiff && ( */}
                    <div className={styles.accountChangedPrompt} style={{ transform: `scaleY(${accountDiff ? 1 : 0})` }}>
                        You are on someone else's profile.
                        <Link to={`/profile/${account}`} className={styles.accountChangedPrompt__link}> Switch to your profile</Link>
                    </div>
            {/* //     )
            // } */}
            <Modal className={styles.Floating} opened={opened} onClose={close} title="List NFT for Sale" centered >
                <div className={styles.modalContainer}>
                    <Title order={1} color="white">{ selectedNFT ? selectedNFT.name : 'NFT' }</Title>
                    <div className={styles.modaldescription}>
                    { selectedNFT ? selectedNFT.description : 'Captain America is the best avenger. He is the fricking American Boy...' }
                    </div>
                    <input className={styles.modalinput} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <div className={styles.modaldescription2}>
                    Recommended price is <strong> 0.12 ETH</strong>
                    </div>
                    <button className={styles.modalbutton} onClick={handlePriceSubmit}>Place For Sale!</button>
                </div>
            </Modal>
            <img className={styles.overlay} src={activeProfile.coverImageUrl}/>
            <div className={styles.profileHeader}>
                <div className={styles.info}>
                    <img src={activeProfile.profileImageUrl} alt="" />
                    <div className={styles.info__txt}>
                        <div className={styles.name}> { activeProfile.name } </div>
                        <CopyToClipboard text={profileId} onCopy={() => toast('Public Key copied to the clipboard')} >
                            <div className={styles.walletAddress}>
                                <div className={styles.walletAddress__icon}><CopyIcon /></div>
                                <div className={styles.walletAddress__addr}> { trim(profileId, MAX_LEN) } </div>
                            </div>
                        </CopyToClipboard>
                        <div className={styles.joined}>
                            <div className={styles.joined__icon}><CalendarIcon /></div>
                            <div className={styles.joined__txt}> Joined on {moment(activeProfile.joined).format('MMMM YYYY')} </div>
                        </div>
                        <div className={styles.website}>
                            <div className={styles.website__icon}><LinkIcon /></div>
                            <Link to={activeProfile.websiteLink} target='_blank'><div className={styles.website__txt}>{activeProfile.websiteLink ? activeProfile.websiteLink : 'Not specified'}</div></Link>
                        </div>
                    </div>
                </div>
                <div className={styles.options}>
                    <div className={styles.actions}>
                        <ShareIcon onClick={copyProfileLink} />
                        {/* <SeeMoreIcon /> */}
                        { (profileId.toLowerCase() === account) && <Link to="/update-profile"><EditIcon /></Link> }
                    </div>
                    <div className={styles.rating}>
                        {/* <div className={styles.rating__text}>Rating: </div> */}
                        <Rating size='lg' value={activeProfile.rating.count === 0 ? 0 : (activeProfile.rating.sum / activeProfile.rating.count)} fractions={2} readOnly />
                    </div>
                </div>
            </div>

            <hr className={styles.separator} />
            {/* <div className={styles.separator}></div> */}

            <div className={styles.toggleBtns}>
                <button className={`${styles.toggleBtn} ${activeSection === 'Your NFTs' && styles.activeBtn}`} onClick={() => setActiveSection('Your NFTs')}>{profileId.toLowerCase() === account.toLowerCase() ? 'My NFTs' : 'NFTs'}</button>
                <div className={`${styles.toggleBtn} ${activeSection === 'Your Transactions' && styles.activeBtn}`} onClick={() => setActiveSection('Your Transactions')}>{profileId.toLowerCase() === account.toLowerCase() ? 'My Transactions' : 'Our Transactions'}</div>
            </div>

            {/* { activeSections[activeSection] } */}

            {(activeSection === 'Your NFTs') ? (<YourNFTs tokens={NFTs} profileId={profileId ? profileId : account} listFunc={ handleListForSale } unlistFunc = {unlistNFT} />) : (<Transactions which={profileId === account ? 'mine' : profileId} />)}
            
        </div>
    ) : (
        <FetchingProfile />
    )

}

const Profile = ({ nft, marketplace, account }) => {

    return account ? (
        <ProfilePage nft={nft} marketplace={marketplace} account={account} />        
    ) : (
        <NoAccount />
    )
  }
  
  export default Profile