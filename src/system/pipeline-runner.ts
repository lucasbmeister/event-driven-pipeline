import { EventEmitter } from 'node:events'
import { PipelineConnection } from './pipeline-connection'
import { PipelineNode } from './pipeline-node'

export class PipelineRunner {

	private emitter = new EventEmitter()
	private nodes: Array<PipelineNode> = []

	private connections: Array<PipelineConnection> = []

	start() {
		this.nodes.forEach(node => node.setRunner(this))
		this.waitForNodes()
		this.emitter.emit('onPrepare')
	}

	private waitForNodes() {
		let ready = 0
		this.emitter.on('nodeReady', () => {
			ready++
			if (ready === this.nodes.length) {
				this.emitter.emit('onStart')
			}
		})
	}

	emitOutput(outputId: string, value: any) {
		const ids = this.connections.filter(conn => conn.fromId === outputId).map(conn => conn.toId)
		if (ids) 
			ids.forEach(id => this.emitter.emit(id, value))
	}

	emit(name: string, ...args: any[]) {
		this.emitter.emit(name, ...args)
	}

	on(name: string, callback: (...args: any[]) => void) {
		this.emitter.on(name, callback)
	}

	addNode(node: PipelineNode) {
		this.nodes.push(node)
	}

	
	addConnection(connection: PipelineConnection) {
		this.connections.push(connection)
	}

	getConnectionByOutputId(outputId: string): PipelineConnection | undefined {
		return this.connections.find(conn => conn.fromId === outputId)
	}

}