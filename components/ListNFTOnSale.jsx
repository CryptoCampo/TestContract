import React from 'react';
import NFTOnSale from './NFTOnSale';


export default function ListNFTOnSale({ listNFTOnSale, getListTokensOnSale }) {
    return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center", justifyContent: "center" }}>
            <h3>NFTs ONSALE</h3>
            <ul style={{margin: "10px",  padding: "10px"}}>
                {listNFTOnSale.length>0 && listNFTOnSale.map((nftOnSale) => <NFTOnSale key={nftOnSale.tokenID} nftOnSale={nftOnSale}/>)}        
            </ul>
            <button onClick={getListTokensOnSale}>Get NFTs On Sale</button>
        </div>
        
        )
}