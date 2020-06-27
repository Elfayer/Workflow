import TreeNode from './entities/TreeNode'

export default class WorkflowBuilder {
  build(root: TreeNode): TreeNode {
    this.computeWeight(root)
    return root
  }

  private computeWeight(node: TreeNode): TreeNode {
    node.weight = node.children.length || 1

    node.children.forEach((childNode) => this.computeWeight(childNode))
    const childrenWeight = node.children.reduce(
      (total, n) => total + n.weight,
      0
    )
    node.weight = childrenWeight > node.weight ? childrenWeight : node.weight
    return node
  }
}
