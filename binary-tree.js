class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  findNode(key) {
    if (key === this.key) return this;
    else if (key < this.key && this.left) {
      return this.left.findNode(key);
    } else if (key > this.key && this.right) {
      return this.right.findNode(key);
    }
    return "Data not found in this tree";
  }

  levelOrderNode(callback) {
    let current = this;
    const queue = [current];
    const result = [];
    while (queue.length > 0) {
      result.push(current);
      queue.splice(0, 1);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      current = queue[0];
    }
    if (callback) return callback(result);
    return result;
  }
}

class Tree {
  constructor(arr) {
    this.sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(this.sortedArray);
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;
    let middleIndex = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[middleIndex]);

    const firstHalf = sortedArray.slice(0, middleIndex);
    const secondHalf = sortedArray.slice(middleIndex + 1);
    newNode.left = this.buildTree(firstHalf);
    newNode.right = this.buildTree(secondHalf);

    return newNode;
  }

  insert(key) {
    this.root = this.insertRec(this.root, key);
  }

  insertRec(root, key) {
    if (root === null) {
      root = new Node(key);
      return root;
    }

    if (key < root.key) root.left = this.insertRec(root.left, key);
    else if (key > root.key) root.right = this.insertRec(root.right, key);

    return root;
  }

  inorderRec(root) {
    if (root !== null) {
      this.inorderRec(root.left);
      document.write(root.key + "<br/>");
      this.inorderRec(root.right);
    }
  }
  inorder() {
    this.inorderRec(this.root);
  }

  /* Given a binary search tree and a key, this function
   deletes the key and returns the new root */
  deleteNode(root, k) {
    if (root === null) {
      return root;
    }
    // Recursive calls for ancestors of node to be deleted
    if (root.key > k) {
      root.left = this.deleteNode(root.left, k);
      return root;
    } else if (root.key < k) {
      root.right = this.deleteNode(root.right, k);
      return root;
    }
    // We reach here when root is the node to be deleted.

    // If one of the children is empty
    if (root.left === null) {
      let temp = root.right;
      root = null;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      root = null;
      return temp;
    }
    // If both children exist
    else {
      let succParent = root;
      // Find successor
      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }
      // Delete successor.  Since successor is always left child of its parent we can safely make successor's right
      // right child as left of its parent.If there is no succ, then assign succ.right to succParent.right
      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }
      // Copy Successor Data to root
      root.key = succ.key;

      // Delete Successor and return root
      succ = null;
      return root;
    }
  }

  preOrderNode(node, result = []) {
    if (!node) return;
    result.push(node.key);
    this.preOrderNode(node.left, result);
    this.preOrderNode(node.right, result);
    return result;
  }

  inOrderNode(node, result = []) {
    if (!node) return;
    this.inOrderNode(node.left, result);
    result.push(node.key);
    this.inOrderNode(node.right, result);
    return result;
  }

  postOrderNode(node, result = []) {
    if (!node) return;
    this.postOrderNode(node.left, result);
    this.postOrderNode(node.right, result);
    result.push(node.key);
    return result;
  }

  findHeightNode(node) {
    if (!node) return -1;
    const leftHeight = this.findHeightNode(node.left);
    const rightHeight = this.findHeightNode(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  findDepthNode(node, current = this.root, depth = 0) {
    if (!current) return -1; // Node not found in the tree

    if (current === node) return depth; // Node found, return depth

    let leftSearch = this.findDepthNode(node, current.left, depth + 1); // Search in the left subtree
    if (leftSearch !== -1) return leftSearch; // If node is found in left subtree, return the depth

    return this.findDepthNode(node, current.right, depth + 1); // Search in the right subtree
  }

  isBalancedTree(root) {
    if (root == null) return true;
    let leftNode = tree.findHeightNode(root.left);
    let rightNode = tree.findHeightNode(root.right);
    if (
      Math.abs(leftNode - rightNode) <= 1 &&
      this.isBalancedTree(root.left) == true &&
      this.isBalancedTree(root.right) == true
    )
      return true;
    return false;
  }

  // Rebalances an unbalanced tree
  rebalance() {
    if (!this.root) {
      console.log("This tree is empty");
      return this;
    }
    if (!this.isBalancedTree(this.root)) {
      const treeNodes = this.inOrderNode(this.root, []); // Use in-order to get a sorted list
      this.root = this.buildTree(treeNodes); // Reconstruct the tree in a balanced way
      console.log("Tree has been rebalanced.");
    } else {
      console.log("This tree is already balanced");
    }
  }

  prettyPrint = (node = this.root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
}

//Test

// 1. Function to generate an array of random numbers
function generateRandomNumbersArray(length, max = 100) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * max));
  }
  return arr;
}

const tree = new Tree(generateRandomNumbersArray(10));

// 2. Confirm if the tree is balanced
console.log("Initial Tree:");
tree.prettyPrint();
if (!tree.isBalancedTree(tree, tree.root)) {
  console.log("Tree is NOT balanced");
} else {
  console.log("Tree is balanced");
}

// 3. Print tree elements
console.log(
  "Level-order Traversal:",
  tree.root.levelOrderNode().map((node) => node.key)
);
console.log("Pre-order Traversal:", tree.preOrderNode(tree.root));
console.log("In-order Traversal:", tree.inOrderNode(tree.root));
console.log("Post-order Traversal:", tree.postOrderNode(tree.root));

// 4. Unbalance the tree
console.log("\nUnbalancing the tree:");
[101, 102, 103, 104, 105].forEach((num) => tree.insert(num));
tree.prettyPrint();

// Confirm that the tree is unbalanced
if (!tree.isBalancedTree(tree, tree.root)) {
  console.log("Tree is NOT balanced");
} else {
  console.log("Tree is balanced");
}

// 5. Rebalance the tree
console.log("\nRebalancing the tree:");
tree.rebalance();
tree.prettyPrint();

// Confirm that the tree is now balanced
if (!tree.isBalancedTree(tree, tree.root)) {
  console.log("Tree is NOT balanced after rebalance");
} else {
  console.log("Tree is balanced after rebalance");
}

// Print tree elements again
console.log(
  "Level-order Traversal after rebalance:",
  tree.root.levelOrderNode().map((node) => node.key)
);
console.log(
  "Pre-order Traversal after rebalance:",
  tree.preOrderNode(tree.root)
);
console.log("In-order Traversal after rebalance:", tree.inOrderNode(tree.root));
console.log(
  "Post-order Traversal after rebalance:",
  tree.postOrderNode(tree.root)
);
