/**
 * @param {string} s
 * @return {number}
 */
var maximumLengthSubstring = function(s) {
    let count = new Array(26).fill(0);

    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        let index = s.charCodeAt(right) - 97;
        count[index]++;

        // If any character appears more than 2 times,
        // move left until the window becomes valid.
        while (count[index] > 2) {
            let leftIndex = s.charCodeAt(left) - 97;
            count[leftIndex]--;
            left++;
        }

        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};