import WorkflowBuilder from '../src/WorkflowBuilder'
import TreeNode from '../src/entities/TreeNode/TreeNode'
import TreeTransformer from '../src/TreeTransformer'

describe('WorkflowBuilder', () => {
  describe('weigth copmutation', () => {
    it('should set root weight to 1 if it has 0 children', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = new TreeNode()

      workflowBuilder.build(root)

      expect(root.weight).toBe(1)
    })

    it('should set root weight to 2 if it has 2 children', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({ 0: [1, 2] })

      workflowBuilder.build(root)

      expect(root.weight).toBe(2)
    })

    it('should set root weight to 2 if it has 1 child with 2 children', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1],
        1: [2, 3],
      })

      workflowBuilder.build(root)

      expect(root.weight).toBe(2)
    })

    it('should set root weight to 2 if it has 2 children with 1 identical child', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [3],
        2: [3],
      })

      workflowBuilder.build(root)

      expect(root.weight).toBe(2)
    })

    it('should set leaf children weight to 2 if it has 2 parents', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [3],
        2: [3],
      })

      workflowBuilder.build(root)

      const leafNode = root.firstChild().firstChild()
      expect(leafNode.weight).toBe(2)
    })
  })
})
