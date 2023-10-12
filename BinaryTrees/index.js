var TreeNode = /** @class */ (function () {
    function TreeNode(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    return TreeNode;
}());
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree() {
        this.root = null;
    }
    // Insert a value into the BST
    BinarySearchTree.prototype.insert = function (value) {
        var newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        }
        else {
            this.insertNode(this.root, newNode);
        }
    };
    BinarySearchTree.prototype.insertNode = function (node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            }
            else {
                this.insertNode(node.left, newNode);
            }
        }
        else {
            if (!node.right) {
                node.right = newNode;
            }
            else {
                this.insertNode(node.right, newNode);
            }
        }
    };
    // Search for a value in the BST
    BinarySearchTree.prototype.search = function (value) {
        return this.searchNode(this.root, value);
    };
    BinarySearchTree.prototype.searchNode = function (node, value) {
        if (!node) {
            return false;
        }
        if (value === node.value) {
            return true;
        }
        if (value < node.value) {
            return this.searchNode(node.left, value);
        }
        else {
            return this.searchNode(node.right, value);
        }
    };
    // Delete a value from the BST
    BinarySearchTree.prototype.delete = function (value) {
        this.root = this.deleteNode(this.root, value);
    };
    BinarySearchTree.prototype.deleteNode = function (node, value) {
        if (!node) {
            return null;
        }
        if (value === node.value) {
            if (!node.left && !node.right) {
                return null; // Node has no children
            }
            else if (!node.left) {
                return node.right; // Node has only a right child
            }
            else if (!node.right) {
                return node.left; // Node has only a left child
            }
            else {
                // Node has both left and right children
                var minRight = this.findMin(node.right);
                node.value = minRight.value;
                node.right = this.deleteNode(node.right, minRight.value);
                return node;
            }
        }
        else if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        }
        else {
            node.right = this.deleteNode(node.right, value);
            return node;
        }
    };
    BinarySearchTree.prototype.findMin = function (node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    };
    // In-order traversal (sorted order) using recursion
    BinarySearchTree.prototype.inOrderTraversal = function () {
        var result = [];
        this.inOrderRecursive(this.root, result);
        return result;
    };
    BinarySearchTree.prototype.inOrderRecursive = function (node, result) {
        if (node) {
            this.inOrderRecursive(node.left, result);
            result.push(node.value);
            this.inOrderRecursive(node.right, result);
        }
    };
    // Pre-order traversal using recursion
    BinarySearchTree.prototype.preOrderTraversal = function () {
        var result = [];
        this.preOrderRecursive(this.root, result);
        return result;
    };
    BinarySearchTree.prototype.preOrderRecursive = function (node, result) {
        if (node) {
            result.push(node.value);
            this.preOrderRecursive(node.left, result);
            this.preOrderRecursive(node.right, result);
        }
    };
    // Post-order traversal using recursion
    BinarySearchTree.prototype.postOrderTraversal = function () {
        var result = [];
        this.postOrderRecursive(this.root, result);
        return result;
    };
    BinarySearchTree.prototype.postOrderRecursive = function (node, result) {
        if (node) {
            this.postOrderRecursive(node.left, result);
            this.postOrderRecursive(node.right, result);
            result.push(node.value);
        }
    };
    // Level-order traversal (breadth-first search) using recursion
    BinarySearchTree.prototype.levelOrderTraversal = function () {
        var result = [];
        var height = this.height(this.root);
        for (var level = 0; level < height; level++) {
            this.levelOrderRecursive(this.root, level, result);
        }
        return result;
    };
    BinarySearchTree.prototype.levelOrderRecursive = function (node, level, result) {
        if (node) {
            if (level === 0) {
                result.push(node.value);
            }
            else {
                this.levelOrderRecursive(node.left, level - 1, result);
                this.levelOrderRecursive(node.right, level - 1, result);
            }
        }
    };
    // Calculate the height of the tree
    BinarySearchTree.prototype.height = function (node) {
        if (!node) {
            return 0;
        }
        var leftHeight = this.height(node.left);
        var rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    };
    return BinarySearchTree;
}());
// Example usage:
var bst = new BinarySearchTree();
bst.insert(5);
bst.insert(3);
bst.insert(8);
bst.insert(1);
bst.insert(4);
bst.insert(7);
bst.insert(9);
console.log("In-order traversal:");
console.log(bst.inOrderTraversal());
console.log("Pre-order traversal:");
console.log(bst.preOrderTraversal());
console.log("Post-order traversal:");
console.log(bst.postOrderTraversal());
console.log("Level-order traversal:");
console.log(bst.levelOrderTraversal());
