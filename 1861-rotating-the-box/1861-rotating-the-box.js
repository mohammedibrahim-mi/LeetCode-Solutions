/**
 * @param {character[][]} boxGrid
 * @return {character[][]}
 */
var rotateTheBox = function(boxGrid) {
    const m = boxGrid.length;
    const n = boxGrid[0].length;

    // Step 1: Simulate gravity (stones fall to the right)
    for (let i = 0; i < m; i++) {
        let empty = n - 1;

        for (let j = n - 1; j >= 0; j--) {
            if (boxGrid[i][j] === '*') {
                empty = j - 1;
            } else if (boxGrid[i][j] === '#') {
                boxGrid[i][j] = '.';
                boxGrid[i][empty] = '#';
                empty--;
            }
        }
    }

    // Step 2: Rotate 90 degrees clockwise
    const ans = Array.from({ length: n }, () => Array(m));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ans[j][m - 1 - i] = boxGrid[i][j];
        }
    }

    return ans;
};