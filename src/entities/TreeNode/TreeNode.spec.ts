import TreeNode, { NoSuchElementException } from './TreeNode'

describe('TreeNode', () => {
  describe('firstChild()', () => {
    it('should throw NoSuchElementException if it has 0 children', () => {
      const node = new TreeNode()
      expect(() => {
        node.firstChild()
      }).toThrowError(NoSuchElementException)
    })

    it('should return the first TreeNode reference if it has 2 children', () => {
      const root = new TreeNode()
      const firstChild = new TreeNode()
      const lastChild = new TreeNode()

      root.children = [firstChild, lastChild]

      expect(root.firstChild()).toBe(firstChild)
    })
  })

  describe('lastChild()', () => {
    it('should throw NoSuchElementException if it has 0 children', () => {
      const node = new TreeNode()
      expect(() => {
        node.lastChild()
      }).toThrowError(NoSuchElementException)
    })

    it('should return the last TreeNode reference if it has 2 children', () => {
      const root = new TreeNode()
      const firstChild = new TreeNode()
      const lastChild = new TreeNode()

      root.children = [firstChild, lastChild]

      expect(root.lastChild()).toBe(lastChild)
    })
  })
})
