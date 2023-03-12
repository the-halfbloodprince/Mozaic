import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NFTsContext } from '../contexts/contexts'
import { SERVER_URL } from '../globals/variables'
import NFTCard from './NFTCard'
import ProfileCard from './ProfileCard'
import styles from './Search.module.css'

function Search() {

    const { searchString } = useParams()
    const [NFTs, setNFTs] = useContext(NFTsContext)
    const [matchedUsers, setMatchedUsers] = useState([])

    const searchUsers = async () => {
        try {
            const {data}  = await axios.get(`${SERVER_URL}/search?term=${searchString}`);
            setMatchedUsers(data);
            console.log(data);
        //     console.log(NFTs);
        //     const foundNFTs = NFTs.filter((nft) => nft.name.includes(term));
        //     setMatchedNFTs(foundNFTs);
        //     console.log(foundNFTs);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        searchUsers()
    }, [])
    // const [matchedNFTs, setMatchedNFTs] = useState([])
    
    // const foundNFTs = NFTs.filter((nft) => nft.name.includes(searchString));
    // setMatchedNFTs(foundNFTs);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Search results for <span className={styles.searchString}>{ searchString }</span>: </h1>
            {/* {
                matchedNFTs.map((n) => <NFTCard nft={n} key={n.itemId}actionText={null} actionFunc={null} />)
            } */}
            <h2 className={styles.section__title}>NFTs</h2>
            <div className={styles.results}>
                {
                    NFTs
                        .filter((nft) => (nft.name.includes(searchString)))
                        // .length
                        .map((n) => <NFTCard nft={n} key={n.itemId} />)
                }
            </div>
            <h2 className={styles.section__title}>Users</h2>
            <div className={styles.results}>
                {
                    matchedUsers
                        // .length
                        .map((p) => <ProfileCard profile={p} />)
                }
            </div>
        </div>
    )
}

export default Search