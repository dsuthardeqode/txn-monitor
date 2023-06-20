import Web3 from "web3";
import { CheckTransactionStatusProps, Response } from "./types";
import { ethereumRpcMap } from "./constants";

async function pool(txHash: string, provider: Web3) {
  const response: Response = {
    status: "txRequest",
    message: "Transaction is pending",
  };
  try {
    const res = await provider?.eth?.getTransactionReceipt(txHash);
    if (res) {
      if (res?.status === true) {
        response.status = "txConfirmed";
        response.message = "Transaction has been completed";
      } else if (res?.status === false) {
        response.status = "txFailed";
        response.message = "Transaction has been failed";
      }
    }
  } catch (e) {
    response.status = "txFailed";
    response.message = JSON.stringify(e);
  }

  return response;
}

export default async function checkTransactionStatus({
  chainId,
  txHash,
  maxConfirmationBlocks = 50,
}: CheckTransactionStatusProps): Promise<Response> {
  const web3 = new Web3(
    ethereumRpcMap[chainId] || "https://rpc-mainnet.maticvigil.com"
  );
  let status: Response;

  const currentBlock = await web3?.eth?.getBlockNumber();

  const blockStart = currentBlock;

  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      const latestBlock = await web3?.eth?.getBlockNumber();
      if (latestBlock <= blockStart + maxConfirmationBlocks) {
        status = await pool(txHash, web3);
        if (status.status === "txConfirmed" || status.status === "txFailed") {
          clearInterval(interval);
          resolve(status);
        } else {
          console.log("checkTransactionStatus", status);
        }
      } else {
        clearInterval(interval);
        resolve(status);
      }
    }, 2000);
  });
}
