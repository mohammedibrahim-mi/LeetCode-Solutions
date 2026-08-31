/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
    let prev = head;
    let curr = head.next;
    let index = 1;

    let first = -1;
    let last = -1;
    let minDistance = Infinity;

    while (curr !== null && curr.next !== null) {
        let next = curr.next;

        // Check if current node is a critical point
        let isMax = curr.val > prev.val && curr.val > next.val;
        let isMin = curr.val < prev.val && curr.val < next.val;

        if (isMax || isMin) {
            // First critical point
            if (first === -1) {
                first = index;
            } else {
                // Distance from previous critical point
                minDistance = Math.min(minDistance, index - last);
            }

            last = index;
        }

        prev = curr;
        curr = next;
        index++;
    }

    // Fewer than 2 critical points
    if (first === -1 || first === last) {
        return [-1, -1];
    }

    let maxDistance = last - first;

    return [minDistance, maxDistance];
};