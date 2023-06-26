import { PipelineAttribute } from './pipeline-attibute';
import { PipelineNode } from './pipeline-node';

export class ValueNode extends PipelineNode {
	handle(input: Record<string, any>): void {
		this.setOutput('output1', this.getEnvironmentValue('value'))
		console.log('VALUENODE')
	}
}

const VALUE_NODE = new ValueNode('Value', 'Fixed value')

VALUE_NODE.setEnvironmentValue('value', 'ALO')

VALUE_NODE.addOutput(new PipelineAttribute('output1'))

export { VALUE_NODE };

