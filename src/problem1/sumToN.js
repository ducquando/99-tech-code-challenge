// Provide 3 unique implementations of the sumation function.
// Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`.

// Input: `n` - any integer
// Output: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

// Edge cases:
// - `n` is zero, return 0.
// - `n` is negative, return negative summation.

/**
* Iterative solution
* Time Complexity: O(n)
* Space Complexity: O(1)
*
* @param {number} n - any integer
* @returns {number} summation to `n`
*/
export var sum_to_n_a = function(n) {
    // Determine the smallest number and the largest number based on the sign of `n`
    const sign = n < 0 ? -1 : 0;
    const smallest = Math.min(sign, n);
    const largest = Math.max(sign, n);

    // Sum them up
    let sum = 0;
    for (let i = smallest; i <= largest; i++) {
        sum += i;
    }
    return sum;
};

/**
* Recursive solution
* Time Complexity: O(n)
* Space Complexity: O(1)
*
* @param {number} n - any integer
* @returns {number} summation to `n`
*/
export var sum_to_n_b = function(n) {
    // Base case
    if (n === 0) return 0;

    // Decrease the number to reach 0 if n is positive, otherwise increase it
    const step = n < 0 ? -1 : 1;

    return n + sum_to_n_b(n - step);
};

/**
* Mathematical solution
* Time Complexity: O(1)
* Space Complexity: O(1)
*
* @param {number} n - any integer
* @returns {number} summation to `n`
*/
export var sum_to_n_c = function(n) {
    // Calculate the summation of positive numbers
    const absN = Math.abs(n);
    const posSum = absN * (absN + 1) / 2;

    return n < 0 ? -posSum : posSum;
};