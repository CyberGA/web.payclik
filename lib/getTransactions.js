// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: process.env.PRIVATE_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

export async function getSentTransactions(address) {
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: address,
    category: ["external", "internal", "erc20", "erc721", "erc1155"],
  });
  return data;
}

export async function getReceiveTransactions(address) {
  const data = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toAddress: address,
    category: ["external", "internal", "erc20", "erc721", "erc1155"],
  });
  return data;
}

export async function getTimeStamp(hash) {
  const data = await alchemy.core.getBlock(hash);
  return data.timestamp
}
