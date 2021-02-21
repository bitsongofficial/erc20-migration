var BitSongGenesis = artifacts.require("BitSongGenesis");
var BitSongToken = artifacts.require("BitSongToken");

const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");

const BRIDGE_ADDRESS = "0xec5E7751780936E57ccc127A148A269aA72adA22";

contract("BitSong Genesis Contract", async (accounts) => {
  it("should not deposit without approval", async () => {
    let contract = await BitSongGenesis.deployed();

    var btsgAmount = web3.utils.toBN(10000);
    var amountWei = new web3.utils.BN(web3.utils.toWei(btsgAmount, "ether"));

    // Transaction should revert
    truffleAssert.reverts(
      contract.deposit(amountWei, "btsg1pippopippopippo", {
        from: accounts[0],
      })
    );
  });

  it("should deposit successfully", async () => {
    let genesis = await BitSongGenesis.deployed();
    let token = await BitSongToken.deployed();

    // Run approval
    await token.approve(genesis.address, web3.utils.toBN(99999));

    // Deposit
    var btsgAmount = web3.utils.toBN(10000);

    let depositTx = await genesis.deposit(btsgAmount, "btsg1pippopippopippo", {
      from: accounts[0],
    });

    // Two events (1 transfer 1 "hasBeenAdded")
    assert.equal(
      depositTx.receipt.rawLogs.length,
      2,
      "events are not 2 as expected!"
    );

    // Check balance
    var balance = await token.balanceOf(BRIDGE_ADDRESS);

    assert.equal(
      balance.toString(),
      "10000",
      "bridge has not the correct balance"
    );
  });
});
