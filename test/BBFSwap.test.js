const { assert } = require('chai');

const Token = artifacts.require("Token");
const BBFSwap = artifacts.require("BBFSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function ether(n){
    let e = web3.utils.toWei(n, 'ether')
    return e
}
function tokens(n) {
    let t = web3.utils.toWei(n, 'ether')
    return t
}


contract('BBSwap', ([deployer, user]) => {
    /**Need to allow the describe functions to access these */
    let token, bbfSwap, amount;
    const totalSupply = tokens('1000000')
    before(async () => {
        token = await Token.new()
        bbfSwap = await BBFSwap.new(token.address)//argument for BBFSwap constructor        
        await token.transfer(bbfSwap.address, totalSupply)
    })
    describe('Token deployment', async() => {
        it('Token contract has a name', async() => {
            const name = await token.name()
            assert.equal(name, 'Barber Buck Fixed')
        })
    })   
    describe('BBFSwap deployment', async() => {
        it('has a name', async() => {            
            const name = await bbfSwap.name()
            assert.equal(name, 'BBFSwap Instant Exchange')
        })
        it('has all of the tokens', async() => {   
            let balance = await token.balanceOf(bbfSwap.address)
            assert.equal(balance.toString(), totalSupply)
        })
    })

    describe('Buying Tokens', async() => {
        let result
        before(async () => {
            amount = ether('1')
            //purchase tokens - 'from' and 'value corrispond in Solidity to msg.sender and msg.value  
            result = await bbfSwap.buyTokens({from: user, value: amount})            
        })
        it('allows instant purchase of tokens from contract for a fixed price in ETH', async() => {      
            //check user balance after token purchase
            let userBalance = await token.balanceOf(user)
            assert.equal(userBalance.toString(), tokens('100'))

            //check bbfSwap balance after token purchase
            let bbfSwapBalance = await token.balanceOf(bbfSwap.address)
            assert.equal(bbfSwapBalance.toString(), tokens('999900'))//subtract 100 from 1 Million
            bbfSwapBalance = await web3.eth.getBalance(bbfSwap.address)
            assert.equal(bbfSwapBalance.toString(), ether('1'))           
        })
        it('emits a Purchase event', async() => {
            const log = result.logs[0].args
            assert.equal(log.account, user)
            assert.equal(log.token, token.address)
            assert.equal(log.amount.toString(), tokens('100').toString())
            assert.equal(log.rate.toString(), '100')
        })        
    })

    describe('Selling Tokens', async() => {
        let result

        describe('Success', () => {
            before(async () => {
                //Approve tokens first, ERC-20 standard
                await token.approve(bbfSwap.address, tokens('100'), {from: user})
                //Sale
                result = await bbfSwap.sellTokens(tokens('100'), {from: user})          
            })
    
            it('allows instant sale of tokens to contract for a fixed price in ETH', async() => {
                //check user balance after token sale
                let userBalance = await token.balanceOf(user)
                assert.equal(userBalance.toString(), tokens('0'))
    
                //check bbfSwap balance after token sale
                let bbfSwapBalance = await token.balanceOf(bbfSwap.address)
                assert.equal(bbfSwapBalance.toString(), tokens('1000000'))//subtract 100 from 1 Million
                bbfSwapBalance = await web3.eth.getBalance(bbfSwap.address)
                assert.equal(bbfSwapBalance.toString(), ether('0'))
            })
            it('emits a Sale event', async() => {
                const log = result.logs[0].args
                assert.equal(log.account, user)
                assert.equal(log.token, token.address)
                assert.equal(log.amount.toString(), tokens('100').toString())
                assert.equal(log.rate.toString(), '100')
            })
        })
        describe('Failure', () => {
            it('rejects sale orders where the user does not have the amount of tokens they are trying to sell', async () => {
                await bbfSwap.sellTokens(tokens('500'), {from: user}).should.be.rejected;
            })
        })
        
    })
    
})