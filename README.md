# Transaction Monitor API

Simple Ethereum transaction monitor for transaction status polling.

## Use case

```
import checkTransactionStatus from "@0xdeepak/transaction-monitor"

// OR

const checkTransactionStatus = require("@0xdeepak/transaction-monitor")

async function checkStatus() {
    // add your transaction hash
    const res = await checkTransactionStatus({txnHash:'0x......',chainId:137,maxConfirmationBlocks?:50})

    // res

    {
        status: "txConfirmed" | "txRequested" | "txFailed",
        message: "Transaction is pending",
        receipt?: Object
    }
}

```
