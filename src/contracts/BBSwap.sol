// SPDX-License-Identifier: LICENSE
pragma solidity >=0.5.0;
import "./Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract BBFSwap {
    using SafeMath for uint256;
    
    string public name = "BBFSwap Instant Exchange";
    Token public token;
    //Need to determine redemtion rate in ETH, number of BBF per ETH
    uint public rate = 100;
    

    event Purchase(
        address account, 
        address token,
        uint amount,
        uint rate
    );
    event Sale(
        address account, 
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token; //set token contract address
    }
    
    //needs to be payable in order to send ether 
    function buyTokens() public payable{
        //ether amount * rate
        uint tokenAmount = msg.value * rate;

        //require the exchange to actually have enough tokens to sell, address(this) refers to the BBFSwap contract address
        require(token.balanceOf(address(this)) >= tokenAmount);

        //Function from Token.sol - token.transfer() - needs arguments, address and value
        token.transfer(msg.sender, tokenAmount);

        //emit event
        emit Purchase(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public{
        //calculate sale amount in ETH
        uint etherAmount = _amount / rate;

        //require the user to have enough tokens to sell
        require(token.balanceOf(msg.sender) >= _amount);

        //require the exchange to actually have enough ether to exchange for the user's tokens
        require(address(this).balance >= etherAmount);
        
        //transfer is the function for ether, built into the blockchian
        msg.sender.transfer(etherAmount);

        //perform the swap, must be approved already
        token.transferFrom(msg.sender, address(this), _amount);

        //emit event
        emit Sale(msg.sender, address(token), _amount, rate);

    }
}