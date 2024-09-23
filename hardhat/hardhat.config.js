require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "infura",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
      // See its defaults
    },
    infura: {
      url: "https://sepolia.infura.io/v3/fe602a56998543878d747f1e62ec1915",
      accounts: ["58032310de21563367ec2b4aabaf1f9b388b2651727af869a47fbc5e65fd3815"]
    },
  },
  solidity: "0.8.24",
};