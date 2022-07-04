import { convertTime } from './convertTime';

describe('convertTime()', () => {
  it('should return a string', () => {
    const { centiSeconds, seconds, minutes } = convertTime(12332);

    expect(typeof centiSeconds).toEqual('string');
    expect(typeof seconds).toEqual('string');
    expect(typeof minutes).toEqual('string');
  });
});
