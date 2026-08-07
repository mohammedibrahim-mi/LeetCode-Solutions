/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
    // Step 1: Prime factorize t into powers of 2, 3, 5, 7
    let temp_t = BigInt(t);
    let a2 = 0, a3 = 0, a5 = 0, a7 = 0;

    while (temp_t % 2n === 0n) { a2++; temp_t /= 2n; }
    while (temp_t % 3n === 0n) { a3++; temp_t /= 3n; }
    while (temp_t % 5n === 0n) { a5++; temp_t /= 5n; }
    while (temp_t % 7n === 0n) { a7++; temp_t /= 7n; }

    // If t contains prime factors > 7, no zero-free digit product can be divisible by t
    if (temp_t > 1n) return "-1";

    // Helper: Constructs the minimal sorted digit string for required prime factors
    const getDigits = (r2, r3, r5, r7) => {
        r2 = Math.max(0, r2);
        r3 = Math.max(0, r3);
        r5 = Math.max(0, r5);
        r7 = Math.max(0, r7);

        const c7 = r7;
        const c5 = r5;
        const c9 = Math.floor(r3 / 2);
        const rem3 = r3 % 2;
        const c8 = Math.floor(r2 / 3);
        const rem2 = r2 % 3;

        let c2 = 0, c3 = 0, c4 = 0, c6 = 0;
        if (rem2 === 2 && rem3 === 1) {
            c2 = 1; c6 = 1;
        } else if (rem2 === 1 && rem3 === 1) {
            c6 = 1;
        } else if (rem2 === 2 && rem3 === 0) {
            c4 = 1;
        } else if (rem2 === 1 && rem3 === 0) {
            c2 = 1;
        } else if (rem2 === 0 && rem3 === 1) {
            c3 = 1;
        }

        return "2".repeat(c2) +
               "3".repeat(c3) +
               "4".repeat(c4) +
               "5".repeat(c5) +
               "6".repeat(c6) +
               "7".repeat(c7) +
               "8".repeat(c8) +
               "9".repeat(c9);
    };

    const DIGIT_FACTORS = [
        [0, 0, 0, 0], // '0'
        [0, 0, 0, 0], // '1'
        [1, 0, 0, 0], // '2'
        [0, 1, 0, 0], // '3'
        [2, 0, 0, 0], // '4'
        [0, 0, 1, 0], // '5'
        [1, 1, 0, 0], // '6'
        [0, 0, 0, 1], // '7'
        [3, 0, 0, 0], // '8'
        [0, 2, 0, 0], // '9'
    ];

    const n = num.length;
    let firstZero = num.indexOf('0');
    if (firstZero === -1) firstZero = n;

    // Flattened Int32Array for fast factor prefix sum lookups
    const pref = new Int32Array((n + 1) * 4);
    for (let idx = 0; idx < n; idx++) {
        const charCode = num.charCodeAt(idx) - 48;
        const f = DIGIT_FACTORS[charCode];
        const baseCurr = idx * 4;
        const baseNext = (idx + 1) * 4;

        if (charCode === 0) {
            pref[baseNext]     = pref[baseCurr];
            pref[baseNext + 1] = pref[baseCurr + 1];
            pref[baseNext + 2] = pref[baseCurr + 2];
            pref[baseNext + 3] = pref[baseCurr + 3];
        } else {
            pref[baseNext]     = pref[baseCurr]     + f[0];
            pref[baseNext + 1] = pref[baseCurr + 1] + f[1];
            pref[baseNext + 2] = pref[baseCurr + 2] + f[2];
            pref[baseNext + 3] = pref[baseCurr + 3] + f[3];
        }
    }

    // Step 2: Check if num itself is valid
    if (firstZero === n) {
        const baseN = n * 4;
        if (
            pref[baseN]     >= a2 &&
            pref[baseN + 1] >= a3 &&
            pref[baseN + 2] >= a5 &&
            pref[baseN + 3] >= a7
        ) {
            return num;
        }
    }

    // Step 3: Prefix matching from right to left
    for (let i = n - 1; i >= 0; i--) {
        if (i > firstZero) continue;

        const baseI = i * 4;
        const p2 = pref[baseI];
        const p3 = pref[baseI + 1];
        const p5 = pref[baseI + 2];
        const p7 = pref[baseI + 3];

        const currDigit = num.charCodeAt(i) - 48;

        for (let d = currDigit + 1; d <= 9; d++) {
            const [d2, d3, d5, d7] = DIGIT_FACTORS[d];

            const req2 = a2 - p2 - d2;
            const req3 = a3 - p3 - d3;
            const req5 = a5 - p5 - d5;
            const req7 = a7 - p7 - d7;

            const sDigits = getDigits(req2, req3, req5, req7);
            const spaceAvail = n - 1 - i;

            if (sDigits.length <= spaceAvail) {
                const onesCount = spaceAvail - sDigits.length;
                return (
                    num.slice(0, i) +
                    d +
                    "1".repeat(onesCount) +
                    sDigits
                );
            }
        }
    }

    // Step 4: If no valid number of length n exists, expand length L > n
    const minS = getDigits(a2, a3, a5, a7);
    const L = Math.max(n + 1, minS.length);
    const onesCount = L - minS.length;
    return "1".repeat(onesCount) + minS;
};