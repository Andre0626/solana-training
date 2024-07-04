import { getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { createMint, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const account = getKeypairFromEnvironment("SECRET_KEY");

// geberated from create-token-mint.ts
const tokenMintPublicKey = new PublicKey("HVH8fuGQE7daUaV6Wa8XctE73SfdDKFiLj4KY1FfrjK4");

const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, account, tokenMintPublicKey, account.publicKey);

console.log(`Token account address: ${getExplorerLink('address', tokenAccount.address.toString(), 'devnet')}`);