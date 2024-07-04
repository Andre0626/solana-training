import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
} from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const account = getKeypairFromEnvironment("SECRET_KEY");
console.log(`Account's public key: ${account.publicKey.toBase58()}`);

// geberated from create-token-mint.ts
const tokenMintPublicKey = new PublicKey("HVH8fuGQE7daUaV6Wa8XctE73SfdDKFiLj4KY1FfrjK4");

const tokenAccountPubKey = new PublicKey("Avc1UP4q5DyihpPmiQHQWe78GwLwQHjZM5N46dZjw1ZV"); //vladi
const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, account, tokenMintPublicKey, tokenAccountPubKey);

const txSignl = await mintTo(
    connection,
    account,
    tokenMintPublicKey,
    tokenAccount.address,
    account,
    100 * 10 ** 9,
    );

console.log(`Transaction confirmed: ${txSignl}`);

