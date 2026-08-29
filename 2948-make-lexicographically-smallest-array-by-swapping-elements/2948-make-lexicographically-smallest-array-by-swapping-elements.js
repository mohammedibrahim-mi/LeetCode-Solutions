/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    const n = nums.length;

    // [value, originalIndex]
    const arr = nums.map((value, index) => [value, index]);

    // Sort by value
    arr.sort((a, b) => a[0] - b[0]);

    let start = 0;

    while (start < n) {
        let end = start;

        // Find all values connected by the limit
        while (
            end + 1 < n &&
            arr[end + 1][0] - arr[end][0] <= limit
        ) {
            end++;
        }

        // Values in this group are already sorted
        const values = [];
        const indices = [];

        for (let i = start; i <= end; i++) {
            values.push(arr[i][0]);
            indices.push(arr[i][1]);
        }

        // Put smallest values at smallest indices
        indices.sort((a, b) => a - b);

        for (let i = 0; i < values.length; i++) {
            nums[indices[i]] = values[i];
        }

        start = end + 1;
    }

    return nums;
};