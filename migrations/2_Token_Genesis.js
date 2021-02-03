const BitSongToken = artifacts.require("BitSongToken");
const BitSongGenesis = artifacts.require("BitSongGenesis");

module.exports = function (deployer) {
  deployer
    .deploy(BitSongToken, "BitSong", "BTSG", 18, 11642085)
    .then(function () {
      return deployer.deploy(
        BitSongGenesis,
        BitSongToken.address,
        "0x0000000000000000000000000000000000000000"
      );
    });
};
