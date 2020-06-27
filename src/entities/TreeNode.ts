import Position from './Position'

export default class TreeNode {
  public pos = new Position()
  public weight = 1

  constructor(public parent: TreeNode[] | null, public children: TreeNode[]) {}
}
