
const Token = artifacts.require("Token");
const BBFSwap = artifacts.require("BBFSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()
contract('BBSwap', (accounts) => {
    describe('BBFSwap deployment', async() => {
        it('contract has a name', async() => {
            let bbfSwap = await BBFSwap.new()
            const name = await bbfSwap.name()
            assert.equal(name, 'BBFSwap Instant Exchange')
        })
    })
})