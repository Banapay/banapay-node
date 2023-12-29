import BanapayClient from "./index";

require('dotenv').config();

const mnemonic: string = process.env.MNEMONIC || "";
const publicKey: string = process.env.PUBLIC_KEY || "";

describe('index.js', () => {
  test('Init client with mnemonic phrase', () => {
    const client = new BanapayClient(mnemonic);
    const clientPublicKey = client.getPublicKey();
    expect(clientPublicKey).toEqual(publicKey);
  });
});
