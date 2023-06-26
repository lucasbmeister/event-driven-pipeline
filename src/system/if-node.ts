import { PipelineAttribute } from './pipeline-attibute';
import { PipelineNode } from './pipeline-node';

export class IfNode extends PipelineNode {
	handle(input: Record<string, any>): void {
		console.log(`${input.input1} === ${input.input2}`)
		this.setOutput('output1', input.input1 === input.input2)
		console.log('IFNODE')
	}
}

const IF_NODE = new IfNode('If', 'If Condition')

IF_NODE.addInput(new PipelineAttribute('input1'))
IF_NODE.addInput(new PipelineAttribute('input2'))

IF_NODE.addOutput(new PipelineAttribute('output1'))

export { IF_NODE };


