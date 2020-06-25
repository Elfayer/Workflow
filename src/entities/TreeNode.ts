import Position from './Position'

export default class TreeNode {
  public parent: TreeNode | null
  public pos = new Position()
  public weight = 1

  constructor(public children: TreeNode[]) {}
}
