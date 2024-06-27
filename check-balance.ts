import "dotenv/config";
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

console.log("Connected to devnet");

const andreWolf = "E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS";
const publicKey = new PublicKey(andreWolf);

const balanceInLamport = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

console.log(`Andre Wolf's balance in lamports: ${balanceInSol}`);