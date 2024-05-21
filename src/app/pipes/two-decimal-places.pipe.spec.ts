import { TwoDecimalPlacesPipe } from './two-decimal-places.pipe';

describe('TwoDecimalPlacesPipe', () => {
  it('create an instance', () => {
    const pipe = new TwoDecimalPlacesPipe();
    expect(pipe).toBeTruthy();
  });
});
