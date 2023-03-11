import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NFTsContext } from '../contexts/contexts'
import { SERVER_URL } from '../globals/variables'
import NFTCard from './NFTCard'

function Search() {

    const { searchString } = useParams()
    const [NFTs, setNFTs] = useContext(NFTsContext)
    const [matchedNFTs, setMatchedNFTs] = useState([])
    
    const foundNFTs = NFTs.filter((nft) => nft.name.includes(searchString));
    setMatchedNFTs(foundNFTs);

    return (
        <div>
            {
                matchedNFTs.map((nft) => <NFTCard nft={nft} key={nft.itemId} />)
            }
        </div>
    )
}

export default Search