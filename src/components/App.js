import React, { Component } from 'react'
import './App.css'
import Token from '../abis/Token.json'
import BBFSwap from '../abis/BBFSwap.json'
import Web3 from 'web3'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }
  async loadBlockchainData(){

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]}) //set state varriable
    //console.log(this.state.account)//fetch from state
    const userEthBalance = await web3.eth.getBalance(this.state.account)
    this.setState({userEthBalance})//key and value have the same name

    //Load Token
    const networkID = await web3.eth.net.getId()//get networkID from MetaMask
    const tokenData = Token.networks[networkID]
    //check for null token data
    if(tokenData){
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({token})
      let userTokenBalance = await token.methods.balanceOf(this.state.account).call()//.call() required to get info from blockchain
      this.setState({userTokenBalance: userTokenBalance.toString()})
    }else{
      window.alert('Token contract not found on the network')
    }

    //Load BBFSwap 
    const bbfSwapData = BBFSwap.networks[networkID]
    //check for null token data
    if(bbfSwapData){
      const bbfSwap = new web3.eth.Contract(BBFSwap.abi, bbfSwapData.address)
      this.setState({bbfSwap})
    }else{
      window.alert('BBFSwap contract not found on the network')
    }
    //loading is done
    this.setState({loading: false})
  }//loadBlockchainData
  async loadWeb3() {    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Please install MetaMask')
      window.location.assign("https://metamask.io/")
    }
  }//loadWeb3



  //buy tokens
  buyTokens = (etherAmount) => {
    this.setState({loading: true})
    this.state.bbfSwap.methods.buyTokens()
    .send(
      {value: etherAmount, from: this.state.account}
    ).on('transactionHash', (hash) => {this.setState({loading: false})})
  }



  //set default values for state varriables
  constructor(props){
    super(props)
    this.state = {
      account: '',
      token: {},
      bbfSwap: {},
      userEthBalance: '0',
      userTokenBalance: '0',
      loading: true
      
    }
  }
  render() {
    let content
    if(this.state.loading){
      content = <p id="loading" className="text-center">Loading...</p>
    }else{
      content = <Main userEthBalance = {this.state.userEthBalance} userTokenBalance = {this.state.userTokenBalance}/>
    }
    return (
      <div className="bg-secondary" style={{height: '58.55rem'}}>
        <Navbar account = {this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{maxWidth: '40rem'}}>
              <br />
              <div className="content mr-auto ml-auto  ">
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
