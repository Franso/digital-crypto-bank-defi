const { assert } = require("chai");

const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("TokenFarm", ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    // load contracts
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();

    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    // Transfer all dappTokens to tokenFarm
    await dappToken.transfer(tokenFarm.address, tokens("1000000"));

    // send tokens to investor
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });
  //  Tests
  // Test DAI
  describe("Mock DAI Deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "Mock DAI Token");
    });
  });

  // Test DApp
  describe("Dapp Token Deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  // Test TokenFarm
  describe("Token Farm Deployment", (async) => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });
    it("contract has tokens", async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance.toString(), tokens("1000000"));
    });
  });

  describe("Farming tokens", async () => {
    it("rewards investors for staking mDai Tokens", async () => {
      let result;
      // check investor balance before staking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor Mock Dai wallet balance correct before staking"
      );
      // Stake mock DAI Tokens
      await daiToken.approve(tokenFarm.address, tokens("100"), {
        from: investor,
      });
      await tokenFarm.stakeTokens(tokens("100"), { from: investor });

      // check staking result
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor Mock DAI balance correct after staking"
      );

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("100", "Token Farm Mock DAI balance correct after staking ")
      );

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor staking balance is correct after staking"
      );

      result = await tokenFarm.isStaking(investor);
      assert.equal(
        result.toString(),
        "true",
        "investor staking status is correct after staking"
      );

      // Issue tokens test
      await tokenFarm.issueTokens({ from: owner });

      // Check balances after issuance
      result = await dappToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor DApp Token wallet balance correct after issuance"
      );
      // Ensure the owner is the only person who can call the contract
      // await tokenFarm.issueTokens({ from: investor }).should_be_rejected;

      // // Unstake Tokens
      await tokenFarm.unstakeTokens({ from: investor });

      // check results after unstaking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "investor Mock DAI wallet balance after staking"
      );

      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Token Farm Mock DAI balance correct after unstaking"
      );

      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "investor staking balance correct after unstaking"
      );
    });
  });
});
