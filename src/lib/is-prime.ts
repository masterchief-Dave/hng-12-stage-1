/**
 * @function isPrime
 * @description Determine if given number is prime.
 * @param {number} num - A natural number.
 * @return {boolean} - Whether the given number is prime.
 * @see https://en.wikipedia.org/wiki/Prime_number
 * @example isPrime(2) = false
 * @example isPrime(3) = true
 */
export const isPrime = (num: number): boolean => {
  // raise corresponding errors upon invalid inputs
  if (num <= 0 || !Number.isInteger(num)) {
    throw new Error('only natural numbers are supported')
  }

  // handle input being 1
  if (num === 1) return false

  // iterate from 2 to the square root of num to find a factor
  // return false upon finding a factor
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false
  }

  // if the entire loop runs without finding a factor, return true
  return true
}
