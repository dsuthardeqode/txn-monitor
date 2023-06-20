import ethers from "ethers";

export interface Response {
  status: TransactionEventCode;
  message: string;
  receipt?: ethers.ethers.TransactionReceipt;
}

export type TransactionEventCode =
  | "txSent"
  | "txPool"
  | "txConfirmed"
  | "txSpeedUp"
  | "txCancel"
  | "txFailed"
  | "txRequest"
  | "nsfFail"
  | "txRepeat"
  | "txAwaitingApproval"
  | "txConfirmReminder"
  | "txSendFail"
  | "txError"
  | "txUnderPriced"
  | "txDropped"
  | "txPoolSimulation"
  | "all";

export interface CheckTransactionStatusProps {
  txHash: string;
  chainId: number;
  maxConfirmationBlocks?: number;
}
