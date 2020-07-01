import TreeTransformer from '../src/TreeTransformer'
import TreeNode from '../src/entities/TreeNode/TreeNode'

describe('TreeTransformer', () => {
  describe('mapToTree()', () => {
    it('should throw if input is empty', () => {
      expect(() => {
        TreeTransformer.mapToTree({})
      }).toThrow()
    })

    it('should return a TreeNode for input { 0: null }', () => {
      const rootNode = TreeTransformer.mapToTree({ 0: null })

      expect(rootNode instanceof TreeNode).toBe(true)
    })

    describe('children()', () => {
      it('should return a node with 0 children for input { 0: null }', () => {
        const rootNode = TreeTransformer.mapToTree({ 0: null })

        expect(rootNode.children.length).toBe(0)
      })

      it('should return a node with 0 children for input { 0: [] }', () => {
        const rootNode = TreeTransformer.mapToTree({ 0: [] })

        expect(rootNode.children.length).toBe(0)
      })

      it('should return a node with 2 children for input { 0: [1, 2] }', () => {
        const rootNode = TreeTransformer.mapToTree({ 0: [1, 2] })

        expect(rootNode.children.length).toBe(2)
      })

      it(`should allow string key and values and return a node with 2 children for input { foo: ['bar', 'baz'] }`, () => {
        const rootNode = TreeTransformer.mapToTree({ foo: ['bar', 'baz'] })

        expect(rootNode.children.length).toBe(2)
      })

      it(`should allow mixed string/number key and values and return a node with 2 children for input { ROOT: [1, 'foo'] }`, () => {
        const rootNode = TreeTransformer.mapToTree({ ROOT: [1, 'foo'] })

        expect(rootNode.children.length).toBe(2)
      })

      it('should return a node with 2 children with a similar child for input { 0: [1, 2], 1: [3], 2: [3] }', () => {
        const rootNode = TreeTransformer.mapToTree({
          0: [1, 2],
          1: [3],
          2: [3],
        })

        expect(rootNode.firstChild().firstChild()).toBe(
          rootNode.lastChild().firstChild()
        )
      })

      it(`should match string keys and return a node with 2 children with a similar child for input { 0: ['foo', 'bar'], foo: [3], bar: [3] }`, () => {
        const rootNode = TreeTransformer.mapToTree({
          0: ['foo', 'bar'],
          foo: [3],
          bar: [3],
        })

        expect(rootNode.firstChild().firstChild()).toBe(
          rootNode.lastChild().firstChild()
        )
      })
    })

    describe('parents()', () => {
      it('should return a node with 0 parents for input { 0: null }', () => {
        const rootNode = TreeTransformer.mapToTree({ 0: null })

        expect(rootNode.parents.length).toBe(0)
      })

      it('should return a node with 0 parents for input { 0: [] }', () => {
        const rootNode = TreeTransformer.mapToTree({ 0: [] })

        expect(rootNode.parents.length).toBe(0)
      })

      it('should return a leaf node with 1 parent for input { 0: [1] }', () => {
        const rootNode = TreeTransformer.mapToTree({ 0: [1] })

        expect(rootNode.firstChild().parents.length).toBe(1)
      })

      it('should return a root node with 2 children with a similar parent for input { 0: [1, 2] }', () => {
        const rootNode = TreeTransformer.mapToTree({
          0: [1, 2],
        })

        expect(rootNode.firstChild().firstParent()).toBe(
          rootNode.lastChild().firstParent()
        )
      })
    })
  })

  describe('treeToArray()', () => {
    it('should return 1 node if rootNode node has 0 children', () => {
      expect(TreeTransformer.treeToArray(new TreeNode()).length).toBe(1)
    })

    it('should return the root node if root node has 0 children', () => {
      const rootNode = new TreeNode()

      expect(TreeTransformer.treeToArray(rootNode)[0]).toBe(rootNode)
    })

    it('should return 2 nodes if root node has 1 children', () => {
      const rootNode = TreeTransformer.mapToTree({ 0: [1] })

      expect(TreeTransformer.treeToArray(rootNode).length).toBe(2)
    })

    it('should return 3 nodes if root node has 2 children', () => {
      const rootNode = TreeTransformer.mapToTree({ 0: [1, 2] })

      expect(TreeTransformer.treeToArray(rootNode).length).toBe(3)
    })

    it('should return 3 nodes if root node has 1 children which has 1 children', () => {
      const rootNode = TreeTransformer.mapToTree({ 0: [1], 1: [2] })

      expect(TreeTransformer.treeToArray(rootNode).length).toBe(3)
    })
  })
})
