import React from 'react';

export default function NFT({ nft }) {
    const ImageID = String(parseInt(nft.tokenID) + 1);
    return (
        <>
            <li style={{listStyle: "none"}}>
                <div style={{display: "grid", gridTemplateColumns: "100%", justifyContent: "center", borderStyle: "solid",  borderWidth: "1px", margin: "10px"}}>
                    <div>
                        <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ImageID}.png`} 
                            alt="Front"
                            height={80}
                            width={80}
                            />
                    </div>
                    <div>
                        ID: {nft.tokenID}
                    </div>
                    <div>
                        Value: {nft.value}
                    </div>
                    <div>
                        {nft.tokenOnSale ? 'On Sale ' : 'Not On Sale '}
                    </div>
                    <div>
                        {nft.tokenOnSale ? `Price ${nft.tokenOnSalePrice}` : ''}
                    </div>
                    <br/>
                </div>
            </li>
        </>
    )
}