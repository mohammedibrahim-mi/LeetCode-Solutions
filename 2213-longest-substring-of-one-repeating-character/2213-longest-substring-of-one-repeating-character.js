var longestRepeating = function(s, queryCharacters, queryIndices) {
    const n = s.length;
    const tree = new Array(4 * n);

    function makeNode(ch, len = 1) {
        return {
            left: ch,
            right: ch,
            prefix: len,
            suffix: len,
            best: len
        };
    }

    function merge(a, b) {
        if (!a) return b;
        if (!b) return a;

        const node = {
            left: a.left,
            right: b.right,
            prefix: a.prefix,
            suffix: b.suffix,
            best: Math.max(a.best, b.best)
        };

        // Entire left segment has the same character
        if (a.prefix === getLength(a) && a.right === b.left) {
            node.prefix = getLength(a) + b.prefix;
        }

        // Entire right segment has the same character
        if (b.suffix === getLength(b) && a.right === b.left) {
            node.suffix = getLength(a) + b.suffix;
        }

        // Join suffix of left + prefix of right
        if (a.right === b.left) {
            node.best = Math.max(
                node.best,
                a.suffix + b.prefix
            );
        }

        return node;
    }

    function getLength(node) {
        // We don't explicitly store length,
        // so calculate it using prefix/suffix only isn't possible.
        // Therefore we'll store length separately.
        return node.len;
    }

    function build(index, left, right) {
        if (left === right) {
            tree[index] = {
                left: s[left],
                right: s[left],
                prefix: 1,
                suffix: 1,
                best: 1,
                len: 1
            };
            return;
        }

        const mid = Math.floor((left + right) / 2);

        build(index * 2, left, mid);
        build(index * 2 + 1, mid + 1, right);

        tree[index] = merge(tree[index * 2], tree[index * 2 + 1]);
    }

    function merge(a, b) {
        if (!a) return b;
        if (!b) return a;

        const node = {
            left: a.left,
            right: b.right,
            prefix: a.prefix,
            suffix: b.suffix,
            best: Math.max(a.best, b.best),
            len: a.len + b.len
        };

        if (a.right === b.left) {
            // Prefix
            if (a.prefix === a.len) {
                node.prefix = a.len + b.prefix;
            }

            // Suffix
            if (b.suffix === b.len) {
                node.suffix = a.suffix + b.len;
            }

            // Best crossing the middle
            node.best = Math.max(
                node.best,
                a.suffix + b.prefix
            );
        }

        return node;
    }

    function update(index, left, right, pos, ch) {
        if (left === right) {
            tree[index] = {
                left: ch,
                right: ch,
                prefix: 1,
                suffix: 1,
                best: 1,
                len: 1
            };
            return;
        }

        const mid = Math.floor((left + right) / 2);

        if (pos <= mid) {
            update(index * 2, left, mid, pos, ch);
        } else {
            update(index * 2 + 1, mid + 1, right, pos, ch);
        }

        tree[index] = merge(
            tree[index * 2],
            tree[index * 2 + 1]
        );
    }

    build(1, 0, n - 1);

    const result = [];

    for (let i = 0; i < queryCharacters.length; i++) {
        const index = queryIndices[i];
        const ch = queryCharacters[i];

        update(1, 0, n - 1, index, ch);

        result.push(tree[1].best);
    }

    return result;
};