/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    const dp = new Array(n + 1).fill(false);

    // dp[i] = true if the current player can win with i stones
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            // Remove j*j stones.
            // If the opponent loses from the remaining stones,
            // current player wins.
            if (!dp[i - j * j]) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};