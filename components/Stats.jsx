import React from 'react';

export default function Stats({ stats, getStats }) {
    return (
        <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
            <h3>STATS</h3>
            <div style={{borderStyle: "solid", margin: "10px", padding: "10px", borderWidth: "1px", textAlign: "center" }}>
                Total Supply: {stats.totalSupply}
                <br/>
                Total Value: {stats.totalValue}
                <br/>
                Can Buy: {stats.canBuy ? 'Yes' : 'No'}
                <br/>
                Can Trade: {stats.canTrade ? 'Yes' : 'No'}
                <br/>
                Can Claim: {stats.canClaim ? 'Yes' : 'No'}
                <br/>
                Balance C1: {stats.balanceC1}
                <br/>
                Balance C2: {stats.balanceC2}
                <br/>
                Balance Funds: {stats.balanceFunds}
                <br/>
                Balance Fees: {stats.balanceFees}
                <br/>
            </div>
            <button onClick={getStats}>Get Stats</button>            
        </div>
    )
}