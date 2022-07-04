export const scramble = (): string => {
  const scramble_options = ['R', 'L', 'D', 'U', 'F', 'B'];
  const scramble_length = 20;
  const scramble: string[] = [];

  for (let i = 0; i < scramble_length; i++) {
    let prime = Math.round(Math.random());
    let option = Math.floor(Math.random() * scramble_options.length);

    if (prime == 0) {
      if (scramble[i] == scramble[i - 1]) {
        prime = Math.round(Math.random());
        option = Math.floor(Math.random() * scramble_options.length);
        scramble.push(scramble_options[option] + "' ");
      } else {
        scramble.push(scramble_options[option] + "' ");
      }
    } else {
      if (scramble[i] == scramble[i - 1]) {
        scramble[i - 1] = scramble_options[option] + '2 ';
      } else {
        scramble.push(scramble_options[option]);
        scramble.push(' ');
      }
    }
  }

  return scramble.join('').trim();
};
