import React from 'react';
import NFT from './NFT';


export default function ListNFT({ listNFT, getNFTs }) {
    return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
            <h3>MY NFTs</h3>
            <ul style={{margin: "10px",  padding: "10px"}}>
                {listNFT.length>0 && listNFT.map((nft) => <NFT key={nft.tokenID} nft={nft}/>)}        
            </ul>
            <button onClick={getNFTs}>Get NFTs</button>
        </div>
        
        )
}