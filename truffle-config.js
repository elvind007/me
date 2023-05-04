module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545, // Change this to the port Ganache is running on (default is 7545)
      network_id: "*" // Match any network id
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Match the Solidity version used in your contracts
    },
  },
};