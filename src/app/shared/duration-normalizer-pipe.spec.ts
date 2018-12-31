import {DurationNormalizerPipe} from './duration-normalizer.pipe';

describe('DurationNormalizerPipe Test', () => {
  const pipe = new DurationNormalizerPipe();

  it('transforms "60" to "1h"', () => {
    expect(pipe.transform(60)).toBe('1h');
  });

  it('transforms "45" to "45 min"', () => {
    expect(pipe.transform(45)).toBe('45 min');
  });

  it('transforms "242" to "4h 2 min"', () => {
    expect(pipe.transform(242)).toBe('4h 2 min');
  });
});
