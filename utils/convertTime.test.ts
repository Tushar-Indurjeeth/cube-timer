import { convertTime, convertTimeW } from './convertTime';

describe('convertTime()', () => {
  it('should return a string', () => {
    const { centiSeconds, seconds, minutes } = convertTime(8480);

    expect(typeof centiSeconds).toEqual('string');
    expect(typeof seconds).toEqual('string');
    expect(typeof minutes).toEqual('string');

    expect(centiSeconds).toEqual('48');
    expect(seconds).toEqual('08');
    expect(minutes).toEqual('00');
  });
});
