/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const rows = new Map();

    for (const [row, seat] of reservedSeats) {
        if (!rows.has(row)) {
            rows.set(row, new Set());
        }
        rows.get(row).add(seat);
    }

    // All rows without reservations can fit 2 groups.
    let ans = (n - rows.size) * 2;

    for (const seats of rows.values()) {
        const left = ![2, 3, 4, 5].some(s => seats.has(s));
        const middle = ![4, 5, 6, 7].some(s => seats.has(s));
        const right = ![6, 7, 8, 9].some(s => seats.has(s));

        if (left && right) {
            ans += 2;
        } else if (left || middle || right) {
            ans += 1;
        }
    }

    return ans;
};