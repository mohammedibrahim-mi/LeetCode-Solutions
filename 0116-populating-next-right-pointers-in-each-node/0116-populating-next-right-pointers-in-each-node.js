/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *     this.val = val === undefined ? 0 : val;
 *     this.left = left === undefined ? null : left;
 *     this.right = right === undefined ? null : right;
 *     this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    if (!root) return null;

    if (root.left) {
        // Connect left -> right
        root.left.next = root.right;

        // Connect right -> next subtree
        if (root.next) {
            root.right.next = root.next.left;
        }
    }

    connect(root.left);
    connect(root.right);

    return root;
};