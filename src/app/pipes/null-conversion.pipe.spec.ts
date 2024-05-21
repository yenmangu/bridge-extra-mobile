import { NullConversionPipe } from './null-conversion.pipe';

describe('NullConversionPipe', () => {
  it('create an instance', () => {
    const pipe = new NullConversionPipe();
    expect(pipe).toBeTruthy();
  });
});
