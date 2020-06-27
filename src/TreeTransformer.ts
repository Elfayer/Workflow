import TreeNode from './entities/TreeNode/TreeNode'

type MapKey = string | number

type NodeMap = {
  [key in MapKey]: TreeNode
}

export type Map = {
  [key in MapKey]: MapKey[] | null
}

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

  static mapToTree(data: Map): TreeNode | null {
    let idIndex = 1
    const nodeArray: NodeMap = {}

    function createNode(key: MapKey) {
      const node = new TreeNode({ id: idIndex++ })
      const values = data[key] || []

      nodeArray[key] = node
      node.children = values.map((k: MapKey) => {
        const nodeFound = nodeArray[k]

        return nodeFound || createNode(k)
      })

      return node
    }

    const rootKey = Object.keys(data)[0]

    if (rootKey) {
      return createNode(rootKey)
    }

    return null
  }
}
