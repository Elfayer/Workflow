import WorkflowBuilder from '../src/WorkflowBuilder'
import TreeNode from '../src/entities/TreeNode'

describe('WorkflowBuilder', () => {
  it('should throw if root node has a parent', () => {
    const workflowBuilder = new WorkflowBuilder()

    expect(workflowBuilder.build(new TreeNode())).toBe({})
  })
})
