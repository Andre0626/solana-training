import "dotenv/config";
import { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { airdropIfRequired, getKeypairFromEnvironment } from "@solana-developers/helpers";
import bs58 from "bs58";

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");

// const andreWolf = "E8fcsDTokKM6XvutFx48JnFh2a28DZJSJy8fgx8J8YpS";
// const publicKey = new PublicKey(andreWolf);

//Import in phantom wallet
const keyFromEnv = getKeypairFromEnvironment("SECRET_KEY");
const newKey = bs58.encode(keyFromEnv.secretKey);
//console.log(`Secret key: ${newKey}`);

const keyToCheck = keyFromEnv.publicKey.toBase58();
console.log(`Public key: ${keyToCheck}`);
const publicKey = new PublicKey(keyToCheck);

const airdrop = await airdropIfRequired(connection, publicKey, 2 * LAMPORTS_PER_SOL, 5*LAMPORTS_PER_SOL);
console.log(`Airdrop successful: ${airdrop}`);
const balanceInLamport = await connection.getBalance(publicKey);
const balanceInSol = balanceInLamport / LAMPORTS_PER_SOL;

console.log(`Andre Wolf's balance in lamports: ${balanceInSol}`);
