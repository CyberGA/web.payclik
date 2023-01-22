// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const config = {
  apiKey: process.env.PRIVATE_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const data = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  toAddress: "0xedCdA4D74003DBcF5A4A8ABc6b2c35F09a6d352c",
  category: ["external", "internal", "erc20", "erc721", "erc1155"],
});

console.log(data);
