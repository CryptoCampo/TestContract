import { useState } from 'react';
import './App.css';
import Wallet from './components/Wallet';
import Buy from './components/Buy';
import Stats from './components/Stats';
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import ListNFT from './components/ListNFT';
import PutOnSale from './components/PutOnSale';
import Trade from './components/Trade';
import RemoveFromSale from './components/RemoveFromSale';
import Claim from './components/Claim';
import ListNFTOnSale from './components/ListNFTOnSale';

function App() {
  const { account, library } = useWeb3React();
//  const nftContract = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const nftContract = "0x75d9c38244ca7ABcD017e9dFDA17d8CB97597C9A";
  const nftABI = require("./ABIs/NFT.json");
//  const busdContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const busdContract = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
  const busdABI = require("./ABIs/BUSD.json");
  
  const [listNFT, setListNFT] = useState([]);
  const [listNFTOnSale, setListNFTOnSale] = useState([]);
  const [stats, setStats] = useState({});
  //const [refresh, setRefresh] = useState(false);

  const buy = async (amount, value) => {
    try {
      const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());
      const busd = new ethers.Contract(busdContract, busdABI.abi, library.getSigner());
      const approved = await busd.allowance(account, nft.address);
      if (approved.toString() !== "0") {
        const tx = await nft.buy(ethers.utils.parseEther(value.toString()), amount);
        await tx.wait();
      } else {
        window.alert("First Approve Spending");
      }
    } catch (error) {
      window.alert(error.data.message);
    }
  }  

  const putOnSale = async (tokenID, price) => {
    try {
      const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());        
      const tx = await nft.putOnSale(tokenID, ethers.utils.parseEther(price.toString()));
      await tx.wait();
    } catch (error) {
      window.alert(error.data.message);
    }
  }  

  const removeFromSale = async (tokenID) => {
    try {
      const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());        
      const tx = await nft.removeFromSale(tokenID);
      await tx.wait();
    } catch (error) {
      window.alert(error.data.message);
    }
  }  
  
  const trade = async (tokenID) => {
    try {
      const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());        
      const busd = new ethers.Contract(busdContract, busdABI.abi, library.getSigner());
      const approved = await busd.allowance(account, nft.address);
      if (approved.toString() !== "0") {
        const tx = await nft.trade(tokenID);
        await tx.wait();
      } else {
        window.alert("First Approve Spending");
      }
    } catch (error) {
      window.alert(error.data.message);
    }
  }  

  const claim = async (tokenIDs) => {
    try {
      const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());        
      const listTokenIDs = tokenIDs.split(",");
      const tx = await nft.claim(listTokenIDs);
      await tx.wait();
    } catch (error) {
      window.alert(error.data.message);
    }
  }    

  const approve = async () => {
    const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());        
    const busd = new ethers.Contract(busdContract, busdABI.abi, library.getSigner());
    const approved = await busd.allowance(account, nft.address);
    if (approved.toString() === "0") {
      const tx = await busd.approve(nft.address, ethers.utils.parseEther("10000000"))
      await tx.wait();
    } else {
      window.alert("Already Approved");
    }
  }

  const getStats = async () => {
    const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());   
    const busd = new ethers.Contract(busdContract, busdABI.abi, library.getSigner());
    const totalSupply = await nft.totalSupply();
    const totalValue = await nft.totalValue();
    const canBuy = await nft.canBuy();
    const canTrade = await nft.canTrade();
    const canClaim = await nft.canClaim();
    const balanceC1 = await busd.balanceOf("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    const balanceC2 = await busd.balanceOf("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
    const balanceFunds = await busd.balanceOf("0x90F79bf6EB2c4f870365E785982E1f101E93b906");
    const balanceFees = await busd.balanceOf("0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65");
    const newStats = {
      totalSupply: totalSupply.toString(), 
      totalValue: ethers.utils.formatEther(totalValue.toString()),
      canBuy: canBuy,
      canTrade: canTrade,
      canClaim: canClaim,
      balanceC1: ethers.utils.formatEther(balanceC1.toString()),
      balanceC2: ethers.utils.formatEther(balanceC2.toString()),
      balanceFunds: ethers.utils.formatEther(balanceFunds.toString()),
      balanceFees: ethers.utils.formatEther(balanceFees.toString())
    };
    setStats(newStats);
  }  

  const getNFTs = async () => {
    const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());
    const balance = await nft.balanceOf(account);
    let items = [];
    for (let i=0;i<balance;i++) {
      const tokenID = await nft.tokenOfOwnerByIndex(account, i);
      const value = await nft.values(tokenID.toString());
      const tokenOnSale = await nft.tokensOnSale(tokenID.toString());
      const item = {
        tokenID: tokenID.toString(), 
        value: ethers.utils.formatEther(value.toString()), 
        tokenOnSale: tokenOnSale.onSale,
        tokenOnSalePrice: ethers.utils.formatEther(tokenOnSale.price.toString()),
      }  
      items.push(item);
    }
    setListNFT(items);
  }

  const getListTokensOnSale = async () => {
    if (!library) {
      window.alert("First connect wallet");
      return;
    }
    const nft = new ethers.Contract(nftContract, nftABI.abi, library.getSigner());
    const listTokensOnSale = await nft.getListTokensOnSale();
    let items = [];
    for (let i=0;i<listTokensOnSale.length;i++) {
      const tokenID = listTokensOnSale[i].toString()
      const value = await nft.values(tokenID);
      const tokenOnSale = await nft.tokensOnSale(tokenID);
      const item = {
        tokenID: tokenID, 
        value: ethers.utils.formatEther(value.toString()), 
        tokenOnSalePrice: ethers.utils.formatEther(tokenOnSale.price.toString()),
      }  
      items.push(item);
    }  
    setListNFTOnSale(items);
  }

  return (
    <div style={{display: "grid", gridTemplateColumns: "300px 300px 300px", justifyContent: "center"}}>

       <Wallet />
       <Buy buy={buy} approve={approve}/>
       <PutOnSale putOnSale={putOnSale}/>
       <RemoveFromSale removeFromSale={removeFromSale}/>
       <Trade trade={trade} approve={approve}/>
       <Claim claim={claim}/>
       <ListNFT listNFT={listNFT} getNFTs={getNFTs}/>
       <ListNFTOnSale listNFTOnSale={listNFTOnSale} getListTokensOnSale={getListTokensOnSale}/>
       <Stats stats={stats} getStats={getStats}/>
    </div>
  );
}

export default App;
