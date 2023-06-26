import { IF_NODE } from './system/if-node';
import { PipelineConnection } from './system/pipeline-connection';
import { PipelineRunner } from './system/pipeline-runner';
import { WEBHOOK_NODE } from './system/trigger-node';
import { VALUE_NODE } from './system/value-node';

const runner = new PipelineRunner();

const connection1 = new PipelineConnection(WEBHOOK_NODE.getOutputId('output1'), IF_NODE.getInputId('input1'))
const connection2 = new PipelineConnection(VALUE_NODE.getOutputId('output1'), IF_NODE.getInputId('input2'))

runner.addConnection(connection1)
runner.addConnection(connection2)

runner.addNode(WEBHOOK_NODE)
runner.addNode(IF_NODE)
runner.addNode(VALUE_NODE)

runner.start()