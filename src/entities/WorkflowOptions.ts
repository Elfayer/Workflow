import WorkflowDirection from './WorkflowDirection'

export default class WorkflowOptions {
  constructor(
    public nodeHeight: number = 50,
    public nodeWidth: number = 200,
    public nodeVMargin: number = 20,
    public nodeHMargin: number = 10,
    public direction: WorkflowDirection = WorkflowDirection.VERTICAL
  ) {}
}
