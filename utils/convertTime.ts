export const convertTime = (time: number) => {
  return {
    centiSeconds: ('0' + (Math.floor(time / 10) % 100)).slice(-2),
    seconds: ('0' + (Math.floor(time / 1000) % 60)).slice(-2),
    minutes: ('0' + (Math.floor(time / 60000) % 60)).slice(-2),
  };
};
