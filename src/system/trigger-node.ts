import { PipelineAttribute } from './pipeline-attibute';
import { PipelineNode } from './pipeline-node';

export abstract class TriggerNode extends PipelineNode {

	type!: 'WEBHOOK' | 'SERVICEBUS'

	protected setType(type: 'WEBHOOK' | 'SERVICEBUS'): void {
		this.type = type
	}

}

export class WebhookNode extends TriggerNode {

	constructor() {
		super('Webhook Trigger', 'Triggers the pipeline on HTTP call')
		this.setType('WEBHOOK')
	}

	handle(input: Record<string, any>): void {
		this.setOutput('output1', 'WEBHOOK')
		console.log('WEBHOOKNODE')
	}
}

const WEBHOOK_NODE = new WebhookNode()

WEBHOOK_NODE.addOutput(new PipelineAttribute('output1'))

export { WEBHOOK_NODE };

