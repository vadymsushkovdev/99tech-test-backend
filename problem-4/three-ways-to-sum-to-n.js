var sum_to_n_a = function(n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
  if (n <= 1) return n;

  return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function(n) {
  let sum = 0;

  for (let index = 1; index <= n; index++) {
    sum += index;
  }
  return sum;
};

//Should return 15
console.log({ a: sum_to_n_a(5), b: sum_to_n_b(5), c: sum_to_n_c(5) })
