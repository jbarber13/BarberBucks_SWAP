import React, { Component } from 'react'
import Identicon from 'identicon.js'


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand"
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="BarberBucks tokens, price is set to a fixed number of ETH, see the Exchange Rate in the app"
        href="#/"
        >
          BarberBucks Fixed Token Swap
        </a>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              className="nav-link small"
              href={`https://kovan.etherscan.io/address/${this.props.account}`}
              target="_blank"
              rel="noopener noreferrer"
            >
               Your Account: {this.props.account}
            </a>
          </li>

          { /**Identicon - only show if account exists*/
            this.props.account
            ? <img
              className="ml-2"
              width="30"
              height="30"
              src={`data:image/png;base64, ${new Identicon(this.props.account, 30).toString()}`}
              alt=""
              />
              :<span></span>
          }
        </ul>
      </nav>
    )
  }
}



export default Navbar
