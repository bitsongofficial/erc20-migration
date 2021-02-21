var BitSongGenesis = artifacts.require("BitSongGenesis");
var BitSongToken = artifacts.require("BitSongToken");

const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");

contract("Ownable and Pausable", async (accounts) => {
  it("should not pause", async () => {
    let contract = await BitSongGenesis.deployed();
    truffleAssert.reverts(contract.pause({ from: accounts[1] }));
  });

  it("should pause", async () => {
    let contract = await BitSongGenesis.deployed();

    // Pause
    await contract.pause({ from: accounts[0] });

    // Get status
    var paused = await contract.paused();

    assert.equal(paused, true, "Contract is not paused");
  });

  it("should not deposit while paused", async () => {
    let genesis = await BitSongGenesis.deployed();
    let token = await BitSongToken.deployed();

    // Run approval (in case we don't have)
    await token.approve(genesis.address, web3.utils.toBN(99999));

    // Deposit
    var btsgAmount = web3.utils.toBN(10000);

    // Should revert
    truffleAssert.reverts(
      genesis.deposit(btsgAmount, "btsg1pippopippopippo", {
        from: accounts[0],
      })
    );
  });

  it("should change owner", async () => {
    let contract = await BitSongGenesis.deployed();

    let res = await contract.transferOwnership(accounts[5]);

    assert.equal(
      res.receipt.rawLogs.length,
      1,
      "events are not 1 as expected!"
    );
  });

  it("should unpause", async () => {
    let contract = await BitSongGenesis.deployed();

    let res = await contract.unpause({ from: accounts[5] });

    assert.equal(
      res.receipt.rawLogs.length,
      1,
      "events are not 1 as expected!"
    );
  });
});
