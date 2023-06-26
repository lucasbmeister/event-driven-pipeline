import { randomUUID } from 'crypto'

export class PipelineAttribute {
	id = randomUUID()
	name: string
	defaultValue: any

	constructor(name: string, defaultValue?: any) {
		this.name = name
		this.defaultValue = defaultValue
	}
}