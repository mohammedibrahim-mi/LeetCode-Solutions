/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function (n, k, invocations) {
    // Build graph
    const graph = Array.from({ length: n }, () => []);

    for (const [u, v] of invocations) {
        graph[u].push(v);
    }

    // Find suspicious methods using BFS
    const suspicious = new Array(n).fill(false);
    const queue = [k];
    suspicious[k] = true;

    let head = 0;
    while (head < queue.length) {
        const node = queue[head++];

        for (const next of graph[node]) {
            if (!suspicious[next]) {
                suspicious[next] = true;
                queue.push(next);
            }
        }
    }

    // Check if any outside method invokes a suspicious one
    for (const [u, v] of invocations) {
        if (!suspicious[u] && suspicious[v]) {
            // Cannot remove
            return Array.from({ length: n }, (_, i) => i);
        }
    }

    // Return remaining methods
    const ans = [];
    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) ans.push(i);
    }

    return ans;
};