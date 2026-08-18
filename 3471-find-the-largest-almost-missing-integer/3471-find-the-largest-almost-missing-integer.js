/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */


var largestInteger = function(nums, k) {
    const count = new Array(51).fill(0);

    for (let i = 0; i <= nums.length - k; i++) {
        const seen = new Set();

        for (let j = i; j < i + k; j++) {
            seen.add(nums[j]);
        }

        for (const value of seen) {
            count[value]++;
        }
    }

    let answer = -1;

    for (let value = 0; value <= 50; value++) {
        if (count[value] === 1) {
            answer = value;
        }
    }

    return answer;
};
