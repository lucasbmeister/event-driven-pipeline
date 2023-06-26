import { IF_NODE } from './system/if-node';
import { PipelineConnection } from './system/pipeline-connection';
import { PipelineRunner } from './system/pipeline-runner';
import { WEBHOOK_NODE } from './system/trigger-node';
import { VALUE_NODE } from './system/value-node';
import { TEST_NODE } from './test-nodes/test-node';

const runner = new PipelineRunner();


runner.addConnection(new PipelineConnection(WEBHOOK_NODE.getOutputId('output1'), IF_NODE.getInputId('input1')))
runner.addConnection(new PipelineConnection(VALUE_NODE.getOutputId('output1'), IF_NODE.getInputId('input2')))
runner.addConnection(new PipelineConnection(IF_NODE.getOutputId('output1'), TEST_NODE.getInputId('input1')))

runner.addNode(TEST_NODE)
runner.addNode(WEBHOOK_NODE)
runner.addNode(IF_NODE)
runner.addNode(VALUE_NODE)

runner.start()