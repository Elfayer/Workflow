import TreeNode from './entities/TreeNode'

export default class TreeTransformer {
  static treeToArray(root: TreeNode): TreeNode[] {
    const nodes: TreeNode[] = []

    function addChildren(node: TreeNode): void {
      nodes.push(node)
      node.children.forEach((childNode) => {
        addChildren(childNode)
      })
    }
    addChildren(root)
    return nodes
  }
}
