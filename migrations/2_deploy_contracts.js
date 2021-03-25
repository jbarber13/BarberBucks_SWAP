const Token = artifacts.require("Token");

const BBSwap = artifacts.require("BBSwap");

//Need function to be async in order to use await, This insures we are waiting for the actual response for the blockchain instead of simply using the promise
module.exports = async function(deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed()

  await deployer.deploy(BBSwap);
  const bbswap = await BBSwap.deployed()

  //Transfer all tokens to EthSwap(1 Million * 10^18 (18 decimal places) or totalSupply = 1000000 * (10 ** decimals))
  const totalSupply = '1000000000000000000000000'  
  await token.transfer(bbswap.address, totalSupply)

  /**
   * Check balance in truffle console with <balance = await token.balanceOf(bbswap.address)><balance.toString()> 
   * Copy the commands from above into the console first, i.e: <token = await Token.deployed()> <bbswap = await BBSwap.deployed()>
   */
};