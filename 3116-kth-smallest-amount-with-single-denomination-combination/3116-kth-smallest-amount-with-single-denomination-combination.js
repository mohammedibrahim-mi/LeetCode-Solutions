/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
    // Remove redundant denominations.
    // If a coin is divisible by another smaller coin,
    // its multiples are already covered.
    coins.sort((a, b) => a - b);

    const filtered = [];

    for (let coin of coins) {
        let redundant = false;

        for (let x of filtered) {
            if (coin % x === 0) {
                redundant = true;
                break;
            }
        }

        if (!redundant) {
            filtered.push(coin);
        }
    }

    coins = filtered;

    // GCD
    function gcd(a, b) {
        while (b !== 0) {
            let t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    // LCM
    function lcm(a, b) {
        return a / gcd(a, b) * b;
    }

    // Count distinct valid amounts <= x
    function count(x) {
        let total = 0;
        const n = coins.length;

        // Inclusion-exclusion over all subsets
        for (let mask = 1; mask < (1 << n); mask++) {
            let multiple = 1;
            let bits = 0;
            let valid = true;

            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    bits++;

                    multiple = lcm(multiple, coins[i]);

                    if (multiple > x) {
                        valid = false;
                        break;
                    }
                }
            }

            if (!valid) continue;

            const amount = Math.floor(x / multiple);

            if (bits % 2 === 1) {
                total += amount;
            } else {
                total -= amount;
            }
        }

        return total;
    }

    // Binary search for the kth valid amount
    let left = 1;
    let right = Math.min(...coins) * k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (count(mid) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};