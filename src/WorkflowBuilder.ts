import TreeNode from './entities/TreeNode/TreeNode'
import WorkflowDirection from './entities/WorkflowDirection'

interface WorkflowOptions {
  nodeHeight: number
  nodeWidth: number
  nodeVMargin: number
  nodeHMargin: number
  direction: WorkflowDirection
}

export default class WorkflowBuilder {
  private nodeTotalWitdh: number
  private nodeTotalHeight: number
  private nodeHalfWitdh: number
  private nodeHalfHeight: number
  private options: WorkflowOptions = {
    nodeHeight: 50,
    nodeWidth: 200,
    nodeVMargin: 20,
    nodeHMargin: 10,
    direction: WorkflowDirection.VERTICAL,
  }

  constructor(options?: Partial<WorkflowOptions>) {
    this.options.nodeHeight = options?.nodeHeight || this.options.nodeHeight
    this.options.nodeWidth = options?.nodeWidth || this.options.nodeWidth
    this.options.nodeVMargin = options?.nodeVMargin || this.options.nodeVMargin
    this.options.nodeHMargin = options?.nodeHMargin || this.options.nodeHMargin
    this.options.direction = options?.direction || this.options.direction
    this.nodeTotalWitdh = this.options.nodeWidth + 2 * this.options.nodeHMargin
    this.nodeTotalHeight =
      this.options.nodeHeight + 2 * this.options.nodeVMargin
    this.nodeHalfWitdh = this.nodeTotalWitdh / 2
    this.nodeHalfHeight = this.nodeTotalHeight / 2
  }

  build(root: TreeNode): TreeNode {
    this.computeWeight(root)
    this.computePosition(root, 0)
    this.positionToChildrenMiddle(root)
    return root
  }

  private computeWeight(node: TreeNode): void {
    node.weight = node.children.length || 1

    node.children.forEach((childNode) => this.computeWeight(childNode))
    const childrenWeight =
      node.children.reduce((total, n) => total + n.weight, 0) /
      node.siblings().length
    const parentsWeight = node.parents.length / node.siblings().length

    node.weight = Math.max(node.weight, childrenWeight, parentsWeight)
  }

  private computePosition(node: TreeNode, depth: number): void {
    this.computePositionX(node)
    this.computePositionY(node, depth)
    node.children.forEach((childNode) => {
      this.computePosition(childNode, depth + 1)
    })
  }

  private computePositionX(node: TreeNode): void {
    const siblingsIndex = node.siblingsIndex()

    if (siblingsIndex === 0) {
      if (node.hasParents()) {
        const firstParent = node.firstParent()
        const lastParent = node.lastParent()

        node.pos.x =
          (firstParent.pos.x + lastParent.pos.x) / 2 -
          this.nodeHalfWitdh * node.siblingsWeight()
      } else {
        node.pos.x = 0
      }
    } else {
      const previousSibling = node.siblings()[siblingsIndex - 1]
      node.pos.x =
        previousSibling.pos.x + this.nodeHalfWitdh * previousSibling.weight
    }
    node.pos.x += this.nodeHalfWitdh * node.weight
  }

  private computePositionY(node: TreeNode, depth: number): void {
    node.pos.y = this.nodeHalfHeight
    node.pos.y += this.nodeTotalHeight * depth
  }

  private positionToChildrenMiddle(node: TreeNode): void {
    if (node.hasChildren()) {
      node.pos.x = (node.firstChild().pos.x + node.lastChild().pos.x) / 2
    }
  }
}
