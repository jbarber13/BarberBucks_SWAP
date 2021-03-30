import React, { Component } from 'react'
import tokenLogo from '../images/logo.jpg'
import ethLogo from '../images/ethereum.png'


class BuyForm extends Component {

    constructor(props){
        super(props)
        this.state = {
          output: '0'          
        }
    }

 
  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let etherAmount = this.input.value.toString()
            etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            this.props.buyTokens(etherAmount)
        }}>
            <h2 className="d-flex justify-content-center text-success">Buy BBF Tokens</h2>
            <div>
                <label className="float-left"><b>Input</b></label>
                <span className="float-right text-muted">
                    Balance: {window.web3.utils.fromWei(this.props.userEthBalance, 'Ether')}
                </span>
            </div>
            <div className="input-group mb-4">
                <input 
                type="text"
                onChange={
                    (event) => { /**Change handler to calculate the conversion in real time */
                        const etherAmount = this.input.value.toString()
                        this.setState({
                            output: etherAmount * 100
                        })
                    }                        
                }
                ref={(input) => {this.input = input}}
                className="form-control form-control-lg"
                placeholder="0"
                required
                />
                <div className="input-group=append">
                    <div className="input-group-text">
                        <img src={ethLogo} height='32' alt=""/>
                        ETH
                    </div>
                </div>                       
            </div>
            <div>
            <label className="float-left"><b>Output</b></label>
                <span className="float-right text-muted">
                    Balance: {window.web3.utils.fromWei(this.props.userTokenBalance, 'Ether')}
                </span>
            </div>
            <div className="input-group mb-2">
                <input 
                type="text"
                className="form-control form-control-lg"
                placeholder="0"
                value={this.state.output}
                disabled
                />
                <div className="input-group=append">
                    <div className="input-group-text">
                        <img src={tokenLogo} height='32' alt=""/>
                        &nbsp;BBF
                    </div>
                </div>                       
            </div>
            <div className="mb-5">
                <span className="float-left text-muted">Exchange Rate:&nbsp;</span>
                <span className="float-left text-muted">1 ETH = 100 BBF</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP</button>
        </form>
    );
  }
}

export default BuyForm;
