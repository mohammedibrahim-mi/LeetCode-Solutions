var missingInteger = function(nums) {
    // Find the longest sequential prefix
    let sum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1] + 1) {
            sum += nums[i];
        } else {
            break;
        }
    }

    // Put all numbers into a Set for O(1) lookup
    const set = new Set(nums);

    // Find the smallest missing integer >= sum
    while (set.has(sum)) {
        sum++;
    }

    return sum;
};