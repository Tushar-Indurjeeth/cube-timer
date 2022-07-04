import { scramble } from './scramble';

describe('scramble()', () => {
  it('should return a string', () => {
    const scrambleMoves = scramble();

    expect(scrambleMoves).toBeDefined();
    expect(typeof scrambleMoves).toEqual('string');
  });
});
