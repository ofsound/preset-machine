export function isPrime(n: number) {
  if (n <= 1) return false
  if (n <= 3) return true

  if (n % 2 === 0 || n % 3 === 0) return false

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false
  }

  return true
}


export function isFibonacci(n: number) {
  const fibonacciNumbers = generateFibonacciInRange()

  return fibonacciNumbers.includes(n)

}

function generateFibonacciInRange() {
  const sequence = [];
  let n1 = 0;
  let n2 = 1;
  let next = n1 + n2;

  // The condition is next <= 511 to include numbers up to and including the limit
  while (next <= 511) {
    // Only include numbers >= 1 as requested
    if (next >= 1) {
      sequence.push(next);
    }
    n1 = n2;
    n2 = next;
    next = n1 + n2;
  }

  return sequence;
}

// To use the function and display the results (e.g., in a console):

