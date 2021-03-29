import React, { Component } from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'


class Main extends Component {

    
    constructor(props) {
        super(props)
        this.state = {
            isBuying: true
        }
    }
    render() {
        let content
        if (this.state.isBuying) {
            content = <BuyForm
                        userEthBalance={this.props.userEthBalance}
                        userTokenBalance={this.props.userTokenBalance}
                        buyTokens={this.props.buyTokens}
                        />
        } else {
            content = <SellForm
                        userEthBalance={this.props.userEthBalance}
                        userTokenBalance={this.props.userTokenBalance}
                        sellTokens={this.props.sellTokens}
                        />
        }
        return (
            <div id="content" className="mt-5" >
                <div className="d-flex justify-content-between mb-3">
                    <button 
                        className="btn btn-dark text-success"
                        onClick={(event) => 
                            this.setState({isBuying: true})
                        }
                        >
                        BUY
                    </button>
                    <button 
                        className="btn btn-dark text-danger"
                        onClick={(event) => 
                            this.setState({isBuying: false})
                        }
                        >
                        SELL
                    </button>
                </div>
                <div className="card mb-4 bg-dark text-white">
                    <div className="card-body">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;
