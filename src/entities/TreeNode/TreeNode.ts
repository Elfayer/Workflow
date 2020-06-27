import Position from '../Position'

export class NoSuchElementException extends Error {
  constructor(msg: string) {
    super(msg)

    Object.setPrototypeOf(this, NoSuchElementException.prototype)
  }
}

export interface TreeNodeData {
  id?: number
  parent?: TreeNode[]
  children?: TreeNode[]
}

export default class TreeNode {
  public id: number
  public pos = new Position()
  public weight = 1
  public parent: TreeNode[]
  public children: TreeNode[]

  constructor(treeNodeData?: TreeNodeData) {
    this.id = treeNodeData?.id || -1
    this.parent = treeNodeData?.parent || []
    this.children = treeNodeData?.children || []
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
}
