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
  }

  build(root: TreeNode): TreeNode {
    this.computeWeight(root)
    this.computePosition(root, 0)
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
    node.pos.x =
      (this.nodeTotalWitdh / 2) * node.weight +
      node.siblingsIndex() * this.nodeTotalWitdh
  }

  private computePositionY(node: TreeNode, depth: number): void {
    node.pos.y = this.nodeTotalHeight / 2 + this.nodeTotalHeight * depth
  }
}
