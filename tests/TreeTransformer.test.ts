import TreeTransformer from '../src/TreeTransformer'
import TreeNode from '../src/entities/TreeNode'

describe('TreeTransformer', () => {
  it('should return 1 node if root node has 0 children', () => {
    expect(TreeTransformer.treeToArray(new TreeNode([])).length).toBe(1)
  })

  it('should return the root node if root node has children', () => {
    const rootNode = new TreeNode([])

    expect(TreeTransformer.treeToArray(rootNode)[0]).toBe(rootNode)
  })

  it('should return 2 nodes if root node has 1 children', () => {
    const rootNode = new TreeNode([new TreeNode([])])

    expect(TreeTransformer.treeToArray(rootNode).length).toBe(2)
  })

  it('should return 3 nodes if root node has 2 children', () => {
    const rootNode = new TreeNode([new TreeNode([]), new TreeNode([])])

    expect(TreeTransformer.treeToArray(rootNode).length).toBe(3)
  })

  it('should return 3 nodes if root node has 1 children which has 1 children', () => {
    const rootNode = new TreeNode([new TreeNode([new TreeNode([])])])

    expect(TreeTransformer.treeToArray(rootNode).length).toBe(3)
  })
})
