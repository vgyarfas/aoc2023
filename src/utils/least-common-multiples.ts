export const leastCommonMultiples = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

/*
 * leastCommonMultiples(12, 7); // 84
 * leastCommonMultiples(...[1, 3, 4, 5]); // 60
 */