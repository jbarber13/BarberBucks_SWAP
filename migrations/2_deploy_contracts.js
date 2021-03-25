const Token = artifacts.require("Token");

const BBFSwap = artifacts.require("BBFSwap");

//Need function to be async in order to use await, This insures we are waiting for the actual response for the blockchain instead of simply using the promise
module.exports = async function(deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed()

  await deployer.deploy(BBFSwap);
  const bbfswap = await BBFSwap.deployed()

  //Transfer all tokens to EthSwap(1 Million * 10^18 (18 decimal places) or totalSupply = 1000000 * (10 ** decimals))
  const totalSupply = '1000000000000000000000000'  
  await token.transfer(bbfswap.address, totalSupply)

  /**
   * Check balance in truffle console with <balance = await token.balanceOf(bbfswap.address)><balance.toString()> 
   * Copy the commands from above into the console first, i.e: <token = await Token.deployed()> <bbfswap = await BBFSwap.deployed()>
   */
};