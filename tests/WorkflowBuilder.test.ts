import WorkflowBuilder from '../src/WorkflowBuilder'
import TreeNode from '../src/entities/TreeNode'

describe('WorkflowBuilder', () => {
  describe('weigth copmutation', () => {
    it('should set root weight to 1 if it has 0 children', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = new TreeNode(null, [])

      workflowBuilder.build(root)

      expect(root.weight).toBe(1)
    })

    it('should set root weight to 2 if it has 2 children', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = new TreeNode(null, [])
      const children = [new TreeNode([root], []), new TreeNode([root], [])]
      root.children = children

      workflowBuilder.build(root)

      expect(root.weight).toBe(2)
    })

    it('should set root weight to 2 if it has 1 child with 2 children', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = new TreeNode(null, [])
      const child = new TreeNode([root], [])
      const deepChildren = [
        new TreeNode([child], []),
        new TreeNode([child], []),
      ]
      root.children = [child]
      child.children = deepChildren

      workflowBuilder.build(root)

      expect(root.weight).toBe(2)
    })

    it('should set root weight to 2 if it has 2 children with 1 identical child', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = new TreeNode(null, [])
      const children = [new TreeNode([root], []), new TreeNode([root], [])]
      const deepChild = new TreeNode(children, [])
      root.children = children
      children.map((n) => (n.children = [deepChild]))

      workflowBuilder.build(root)

      expect(root.weight).toBe(2)
    })
  })
})
