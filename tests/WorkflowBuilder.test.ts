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

    it('should set leaf child weight to 2 if it has 2 parents', () => {
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

    it('should set leaf children weight to 1.5 if leaf nodes have 3 parents each', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1, 2, 3],
        1: [4, 5],
        2: [4, 5],
        3: [4, 5],
      })

      workflowBuilder.build(root)

      const leafNode = root.firstChild().firstChild()
      expect(leafNode.weight).toBe(1.5)
    })
  })

  describe('position computation', () => {
    it('should position a single node in the middle', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = new TreeNode()

      workflowBuilder.build(node)

      expect(node.pos.x).toBe(110)
      expect(node.pos.y).toBe(45)
    })

    it('should position a node with 1 child in the middle on top', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = TreeTransformer.mapToTree({
        0: [1],
      })

      workflowBuilder.build(node)

      expect(node.pos.x).toBe(110)
      expect(node.pos.y).toBe(45)
    })

    it('should position a child with 1 parent in the middle of its parent', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = TreeTransformer.mapToTree({
        0: [1],
      })

      workflowBuilder.build(node)

      expect(node.firstChild().pos.x).toBe(110)
      expect(node.firstChild().pos.y).toBe(135)
    })

    it('should position the root node with 2 children in the middle on top', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = TreeTransformer.mapToTree({
        0: [1, 2],
      })

      workflowBuilder.build(node)

      expect(node.pos.x).toBe(220)
      expect(node.pos.y).toBe(45)
    })

    it('should position the first child with 1 parent and 1 sibling the left most', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = TreeTransformer.mapToTree({
        0: [1, 2],
      })

      workflowBuilder.build(node)

      expect(node.firstChild().pos.x).toBe(110)
      expect(node.firstChild().pos.y).toBe(135)
    })

    it('should position the last child with 1 parent and 1 sibling the right most', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = TreeTransformer.mapToTree({
        0: [1, 2],
      })

      workflowBuilder.build(node)

      expect(node.lastChild().pos.x).toBe(330)
      expect(node.lastChild().pos.y).toBe(135)
    })

    it('should position a child relative to its parent', () => {
      const workflowBuilder = new WorkflowBuilder()
      const node = TreeTransformer.mapToTree({
        0: [1, 2],
        2: [3],
      })

      workflowBuilder.build(node)

      expect(node.lastChild().firstChild().pos.x).toBe(330)
      expect(node.lastChild().firstChild().pos.y).toBe(225)
    })

    it('should position a child with 2 parents in the middle below', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [3],
        2: [3],
      })

      workflowBuilder.build(root)

      const node = root.firstChild().firstChild()
      expect(node.pos.x).toBe(220)
      expect(node.pos.y).toBe(225)
    })

    it('should position root node in the middle of its first and last child', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [3, 4],
      })

      workflowBuilder.build(root)

      expect(root.pos.x).toBe(385)
      expect(root.pos.y).toBe(45)
    })

    it('should position a node spaced out from the other branches', () => {
      const workflowBuilder = new WorkflowBuilder()
      const root = TreeTransformer.mapToTree({
        0: [1, 2],
        1: [3, 4],
      })

      workflowBuilder.build(root)

      const node = root.lastChild()
      expect(node.pos.x).toBe(550)
      expect(node.pos.y).toBe(135)
    })
  })
})
