import { PipelineAttribute } from '../system/pipeline-attibute';
import { PipelineNode } from '../system/pipeline-node';

export class TestNode extends PipelineNode {
	handle(input: Record<string, any>): void {
		console.log(`I'm a test after IF and got valule: ${input.input1}`)
	}
}

const TEST_NODE = new TestNode('Test Node', '')

TEST_NODE.addInput(new PipelineAttribute('input1'))

export { TEST_NODE };
