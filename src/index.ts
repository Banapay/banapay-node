import { Keypair } from "@solana/web3.js";
import nacl from 'tweetnacl';
import * as bip39  from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import * as bs58 from 'bs58';

class BanapayClient {
  private rpcUrl: string;
  private keypair: Keypair;

  constructor(mnemonic?: string, privateKey?: string,rpcUrl?: string) {
    this.rpcUrl = rpcUrl || "https://api.mainnet-beta.solana.com";
    if (privateKey) {
      this.keypair = this.createKeypairFromPrivateKey(privateKey);
      return;
    }
    if (mnemonic) {
      this.keypair = this.createKeypairFromMnemonic(mnemonic);
      return;
    }
    throw new Error("Mnemonic or private key is required");
  }

  private createKeypairFromPrivateKey(privateKey: string): Keypair {
    const keypair = Keypair.fromSecretKey(
      bs58.decode(privateKey)
    );
    
    return keypair;
  }

  private createKeypairFromMnemonic(mnemonic: string): Keypair {
    let seed = bip39.mnemonicToSeedSync(mnemonic);
    const seedBuffer = Buffer.from(seed).toString('hex');
    const path44Change = "m/44'/501'/0'/0'";
    const derivedSeed = derivePath(path44Change, seedBuffer).key;
    const keypair = Keypair.fromSeed(derivedSeed);
    return keypair;
  }

  public getPublicKey(): string {
    return this.keypair.publicKey.toBase58();
  }
}

export default BanapayClient;