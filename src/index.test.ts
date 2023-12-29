import BanapayClient from "./index";

require('dotenv').config();

const mnemonic: string = process.env.MNEMONIC || "";
const publicKey: string = process.env.PUBLIC_KEY || "";
const privateKey: string = process.env.PRIVATE_KEY || "";

describe('index.js', () => {
  test('Init client with mnemonic phrase', () => {
    const client = new BanapayClient(mnemonic);
    const clientPublicKey = client.getPublicKey();
    expect(clientPublicKey).toEqual(publicKey);
  });

  test('Init client with private key', () => {
    const client = new BanapayClient(undefined, privateKey, undefined);
    const clientPublicKey = client.getPublicKey();
    expect(clientPublicKey).toEqual(publicKey);
  });

  test('Init client without any data', () => {
    expect(() => {
      const client = new BanapayClient();
    }).toThrowError("Mnemonic or private key is required");
  });
});
