class TreeNode<T> {
    value: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
  
    constructor(value: T) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
class BinarySearchTree<T> {
    root: TreeNode<T> | null;
  
    constructor() {
        this.root = null;
    }
  
    // Insert a value into the BST
    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }
  
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>): void {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }
  
    // Search for a value in the BST
    search(value: T): boolean {
        return this.searchNode(this.root, value);
    }
  
    private searchNode(node: TreeNode<T> | null, value: T): boolean {
        if (!node) {
            return false;
        }
  
        if (value === node.value) {
            return true;
        }
  
        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
  
    // Delete a value from the BST
    delete(value: T): void {
        this.root = this.deleteNode(this.root, value);
    }
  
    private deleteNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
        if (!node) {
            return null;
        }
  
        if (value === node.value) {
            if (!node.left && !node.right) {
                return null; // Node has no children
            } else if (!node.left) {
                return node.right; // Node has only a right child
            } else if (!node.right) {
                return node.left; // Node has only a left child
            } else {
                // Node has both left and right children
                const minRight = this.findMin(node.right);
                node.value = minRight.value;
                node.right = this.deleteNode(node.right, minRight.value);
                return node;
            }
        } else if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
            return node;
        } else {
            node.right = this.deleteNode(node.right, value);
            return node;
        }
    }
  
    private findMin(node: TreeNode<T>): TreeNode<T> {
        while (node.left) {
            node = node.left;
        }
        return node;
    }
      
    // In-order traversal (sorted order) using recursion
    inOrderTraversal(): T[] {
        const result: T[] = [];
        this.inOrderRecursive(this.root, result);
        return result;
    }

    private inOrderRecursive(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this.inOrderRecursive(node.left, result);
            result.push(node.value);
            this.inOrderRecursive(node.right, result);
        }
    }
      
    // Pre-order traversal using recursion
    preOrderTraversal(): T[] {
        const result: T[] = [];
        this.preOrderRecursive(this.root, result);
        return result;
    }

    private preOrderRecursive(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            result.push(node.value);
            this.preOrderRecursive(node.left, result);
            this.preOrderRecursive(node.right, result);
        }
    }
      
    // Post-order traversal using recursion
    postOrderTraversal(): T[] {
        const result: T[] = [];
        this.postOrderRecursive(this.root, result);
        return result;
    }

    private postOrderRecursive(node: TreeNode<T> | null, result: T[]): void {
        if (node) {
            this.postOrderRecursive(node.left, result);
            this.postOrderRecursive(node.right, result);
            result.push(node.value);
        }
    }
      
    // Level-order traversal (breadth-first search) using recursion
    levelOrderTraversal(): T[] {
        const result: T[] = [];
        const height = this.height(this.root);
        for (let level = 0; level < height; level++) {
            this.levelOrderRecursive(this.root, level, result);
        }
        return result;
    }

    private levelOrderRecursive(node: TreeNode<T> | null, level: number, result: T[]): void {
        if (node) {
            if (level === 0) {
                result.push(node.value);
            } else {
                this.levelOrderRecursive(node.left, level - 1, result);
                this.levelOrderRecursive(node.right, level - 1, result);
            }
        }
    }
      
    // Calculate the height of the tree
    private height(node: TreeNode<T> | null): number {
        if (!node) {
            return 0;
        }
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
  
  // Example usage:
  const bst = new BinarySearchTree<number>();
  
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
  