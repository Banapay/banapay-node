import BanapayClient from "./index";

describe('index.js', () => {
  test('Banapay client', () => {
    const client = new BanapayClient("dwadaw");
    expect(client).toEqual(new BanapayClient("dwadaw"));
  });
});
