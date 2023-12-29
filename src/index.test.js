import sdk from './index';

describe('index.js', () => {
  test('Test hello world!', () => {
    const result = sdk.helloWorld();
    expect(result).toEqual("Hello World!");
  });
});
