import React from 'react';

export default function NFTOnSale({ nftOnSale }) {
    const ImageID = String(parseInt(nftOnSale.tokenID) + 1);
    return (
        <>
            <li style={{listStyle: "none"}}>
                <div style={{display: "grid", gridTemplateColumns: "100%", justifyContent: "center", borderStyle: "solid",  borderWidth: "1px", margin: "10px" }}>
                    <div>
                        <img 
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ImageID}.png`} 
                            alt="Front"
                            height={80}
                            width={80}
                        />
                    </div>
                    <div>
                        ID: {nftOnSale.tokenID}
                    </div>
                    <div>
                        Value: {nftOnSale.value}
                    </div>
                    <div>
                        Price: {nftOnSale.tokenOnSalePrice}
                    </div>
                </div>
            </li>
        </>
    )
}