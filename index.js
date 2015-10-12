"use strict";

function Leaf(data) {
	if (data === null) {
		return data;
	}
	return Object.defineProperty(Object.defineProperty({
		data: data,
		children: [null, null],
		addRightChild: function (data) {
			this.children[1] = Leaf(data);
			return this.right;
		},
		addLeftChild: function (data) {
			this.children[0] = Leaf(data);
			return this.left;
		}
	}, "right", {
		get: function () {
			return this.children[1];
		},
		configurable: false
	}), "left", {
		get: function () {
			return this.children[0];
		},
		configurable: false
	});
}
module.exports = function Tree(rootData) {
	return {
		root: new Leaf(rootData),
		traverseInOrder: function (node, fn) {
			if (node === null) { return null; }
			if (typeof node === "function") {
				fn = node;
				node = this.root;
			}
			this.traverseInOrder(node.right, fn);
			fn(node);
			this.traverseInOrder(node.left, fn);
		},
	};
};
