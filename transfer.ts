import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

import { createMemoInstruction } from "@solana/spl-memo";

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(`Sender's public key: ${sender.publicKey.toBase58()}`);

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const receiver = new PublicKey("7ex95SBsiEP11awST86WoEpfjy9CTANberhkJKM8nuMb");

const receiverBalanceBefore = await connection.getBalance(receiver);

console.log(
  `Receiver's balance before: ${receiverBalanceBefore / LAMPORTS_PER_SOL} SOL`
);

const transaction = new Transaction();

const transferInstruction = SystemProgram.transfer({
  fromPubkey: sender.publicKey,
  toPubkey: receiver,
  lamports: 0.5 * LAMPORTS_PER_SOL,
});

console.log("Adding transfer instruction to transaction");

transaction.add(transferInstruction);

const memoInstruction = createMemoInstruction("Message from Andre Wolf");

transaction.add(memoInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [sender,]);

console.log("Transaction confirmed", signature);
