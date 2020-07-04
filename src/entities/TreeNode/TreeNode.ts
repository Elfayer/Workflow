import Position from '../Position'

export class NoSuchElementException extends Error {
  constructor(msg: string) {
    super(msg)

    Object.setPrototypeOf(this, NoSuchElementException.prototype)
  }
}

export interface TreeNodeData {
  id?: number
  parents?: TreeNode[]
  children?: TreeNode[]
}

export default class TreeNode {
  public id: number
  public pos = new Position()
  public weight = 1
  public parents: TreeNode[]
  public children: TreeNode[]

  constructor(treeNodeData?: TreeNodeData) {
    this.id = treeNodeData?.id || -1
    this.parents = treeNodeData?.parents || []
    this.children = treeNodeData?.children || []
  }

  hasParents(): boolean {
    return this.parents.length > 0
  }

  hasChildren(): boolean {
    return this.children.length > 0
  }

  firstChild(): TreeNode {
    const firstChild = this.children[0]

    if (!firstChild) {
      throw new NoSuchElementException('No children')
    }

    return firstChild
  }

  lastChild(): TreeNode {
    const lastChild = this.children[this.children.length - 1]

    if (!lastChild) {
      throw new NoSuchElementException('No children')
    }

    return lastChild
  }

  firstParent(): TreeNode {
    const firstParent = this.parents[0]

    if (!firstParent) {
      throw new NoSuchElementException('No Parent')
    }
    return firstParent
  }

  lastParent(): TreeNode {
    const lastParent = this.parents[this.parents.length - 1]

    if (!lastParent) {
      throw new NoSuchElementException('No Parent')
    }

    return lastParent
  }

  siblings(): TreeNode[] {
    if (this.parents.length === 0) {
      return [this]
    }

    const siblings = new Set<TreeNode>()

    this.parents.forEach((parent) =>
      parent.children.forEach((child) => siblings.add(child))
    )

    return [...siblings]
  }

  siblingsIndex(): number {
    return this.siblings().findIndex((node) => this === node)
  }

  siblingsWeight(): number {
    const parentsTotalWeight = this.parents.reduce(
      (total, parent) => total + parent.weight,
      0
    )
    const childrenTotalWeight = this.children.reduce(
      (total, child) => total + child.weight,
      0
    )
    return Math.max(parentsTotalWeight, childrenTotalWeight)
  }
}
