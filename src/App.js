import './App.css';
import { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from './utils/load-contract';
import Web3 from 'web3';


function App() {

  const [web3API, setWeb3API] = useState({
    provider:null,
    web3:null,
    contract:null
  })

  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)

  
  useEffect(()=>{
    const loadProvider = async () => {
      const provider = await detectEthereumProvider()
      const contract = await loadContract("Simplebank", provider)

      if(provider){
        setWeb3API(
          {
            provider:provider,
            web3: new Web3(provider),
            contract:contract
          }
        )
      }else{
        console.log("Please install metamask")
      }
    }
    loadProvider()
  },[])

useEffect(
  () => {
    const loadBalance = async () => {
      const {contract,web3} = web3API
      const balance = await web3.eth.getBalance(contract.address)
      setBalance(web3.utils.fromWei(balance, "ether"))
    }
    loadBalance()
  },[web3API])

  useEffect(()=>{
    const getAccount = async () => {
      const accounts = await web3API.web3.eth.getAccounts()
      setAccount(accounts[0])
    }
    getAccount()
  },[web3API.web3])
   
    
  return (
    <div className="App">
    <div>Current Balance is {balance} </div>
    <div>Check that your account is {account}</div>
    </div>
  );
}

export default App;

