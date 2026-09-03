/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {
    let minOdd = Infinity;

    // Find the smallest odd number
    for (let num of nums1) {
        if (num % 2 === 1) {
            minOdd = Math.min(minOdd, num);
        }
    }

    // Check if we can make everything odd
    let canMakeOdd = true;

    for (let num of nums1) {
        if (num % 2 === 0) {
            // Need an odd number smaller than num
            if (minOdd === Infinity || minOdd >= num) {
                canMakeOdd = false;
                break;
            }
        }
    }

    if (canMakeOdd) return true;

    // Check if we can make everything even
    // Every odd number must subtract a smaller odd number.
    let canMakeEven = true;

    for (let num of nums1) {
        if (num % 2 === 1) {
            if (minOdd === num) {
                // Smallest odd number cannot subtract another
                // smaller positive odd number.
                canMakeEven = false;
                break;
            }
        }
    }

    return canMakeEven;
};