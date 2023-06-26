import { randomUUID } from 'crypto'

export class PipelineConnection {
	
	public readonly id = randomUUID()
	private from!: string
	private to!: string

	constructor(from: string, to: string) {
		this.from = from
		this.to = to
	}

	public get fromId(): string {
		return this.from
	}

	public get toId(): string {
		return this.to
	}
}