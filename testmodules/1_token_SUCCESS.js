const fs = require('fs');
const moment = require("moment");
const ReindeerToken = artifacts.require('./ReindeerToken.sol');
const { toWei, timeTravel, timeLeap, should, BigNumber} = require('./utils/reindeerHelper');
const { assertThrows } = require('./utils/assertThrows');

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

async function deployContract(someEther, accounts) {

    const obj = [];
    obj["token"] = await ReindeerToken.new();
    await obj["token"].mint(accounts[0],someEther);
    //Crowdsale contract need to transfer tokens for purchase within buyToken process!
    return obj;
}


contract('ReindeerTokenOnly', (accounts) => {

  before(async () => {
  })
  beforeEach(async function () {
  }) 
  afterEach(async function () 
  {
  })
  
  describe('1) Walkthrough.', function() {
    context('--SUCCESS', ()=> {
      it('Prepare new token', async function () {
	token = await ReindeerToken.new();
      });
      it('InitialMint', async function () {
	await token.mint(accounts[0],1).should.be.fulfilled;
	await token.mint(accounts[1],1000000000000000000).should.be.fulfilled;	
      });
      it('Minted1', async function () {
	const balance1 = await token.balanceOf(accounts[0])
	await assert.equal(balance1, 1);	
      });
      it('Minted2', async function () {
	const balance2 = await token.balanceOf(accounts[1])
	await assert.equal(balance2, 1000000000000000000);	
      });
      it('AdditionalMint', async function () {
	await token.mint(accounts[0],100).should.be.fulfilled;
	const balance3 = await token.balanceOf(accounts[0])
	await assert.equal(balance3, 101);	
      });
      it('TotalSupply', async function () {
        const total1 = await token.totalSupply();
	await assert.equal(total1, 1000000000000000101);	
      });
      it('Burnable', async function () {
	await token.burn(50, {from: accounts[0]});
        const total2 = await token.totalSupply();
	await assert.equal(total2, 1000000000000000051);	
      });
      it('Own1', async function () {
	const balance1 = await token.balanceOf(accounts[0])
	await assert.equal(balance1, 51);	
      });
      it('Own2', async function () {
	const balance2 = await token.balanceOf(accounts[1])
	await assert.equal(balance2, 1000000000000000000);	
      });

      it('Transfer ownership', async function () {
        await token.transferOwnership(accounts[2]).should.be.fulfilled;
        var ownership = await token.owner();
        await assert.equal(ownership, accounts[2]);
      });

    })
  })
})
