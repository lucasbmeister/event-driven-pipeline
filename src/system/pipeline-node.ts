import { randomUUID } from 'crypto'
import { PipelineAttribute } from './pipeline-attibute'
import { PipelineRunner } from './pipeline-runner'

export abstract class PipelineNode {

	protected readonly id = randomUUID()

	protected name!: string
	protected description!: string

	private inputData: Record<string, any> = {}

	protected inputs: Array<PipelineAttribute> = []
	protected outputs: Array<PipelineAttribute> = []
	protected environment: Record<string, string> = {}

	private runner!: PipelineRunner

	constructor(name: string, description: string) {
		this.name = name
		this.description = description
	}

	private onPrepare() {
		this.runner.on('onPrepare', () => this.prepareListeners())
		this.runner.on('onStart', () => {
			if (!this.inputs.length) {
				this.handle(this.inputData)
			}
		})
	}

	public setRunner(runner: PipelineRunner) {
		this.runner = runner
		this.onPrepare()
	}

	public setEnvironmentValue(name: string, value: any) {
		this.environment[name] = value
	}

	public getEnvironmentValue(name: string): any {
		return this.environment[name]
	}

	private prepareListeners() {

		this.inputs.forEach(input => {
			this.runner.on(input.id, (value: any) => this.connectionReceived(input, value))
		})

		this.runner.emit('nodeReady')
	}


	public addInput(input: PipelineAttribute) {
		this.inputs.push(input)
	}

	public addOutput(output: PipelineAttribute) {
		this.outputs.push(output)
	}

	// WEAK: Just for tests. When using a real editor, the id is in context
	getInputId(name: string): string {
		return this.inputs.find(input => input.name === name)?.id ?? ''
	}

	getOutputId(name: string): string {
		return this.outputs.find(output => output.name === name)?.id ?? ''
	}

	protected setOutput(name: string, value: any) {
		const outputId = this.outputs.find(output => output.name === name)?.id ?? ''
		this.runner.emitOutput(outputId, value)
	}

	private connectionReceived(input: PipelineAttribute, value: any) {
		this.inputData[input.name] = value
		this.checkIfReady()
	}

	private checkIfReady() {
		if (Object.keys(this.inputData).length === this.inputs.length) {
			this.handle({ ...this.inputData })
			this.inputData = {}
		}
	}

	abstract handle(input: Record<string, any>): void

}