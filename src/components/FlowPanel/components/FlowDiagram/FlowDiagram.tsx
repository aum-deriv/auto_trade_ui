import { Text } from "@deriv-com/quill-ui";
import ReactFlow, {
    Background,
    Edge,
    Handle,
    Node,
    Position,
    useNodesState,
    useEdgesState,
    ConnectionLineType,
    DefaultEdgeOptions,
    MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useEffect } from "react";
import { useStrategy } from "../../../../contexts/StrategyContext";
import styles from "./FlowDiagram.module.scss";

const CustomNode = ({ data }: { data: { label: string; step: number } }) => (
    <div className={styles.node}>
        <Handle
            id="target"
            type="target"
            position={Position.Top}
            className={styles.handle}
        />
        <Text size="sm" bold className={styles.node_step}>
            Step {data.step}
        </Text>
        <Text size="md" className={styles.node_content}>
            {data.label}
        </Text>
        <Handle
            id="source"
            type="source"
            position={Position.Bottom}
            className={styles.handle}
        />
    </div>
);

const nodeTypes = {
    custom: CustomNode,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
    type: "bezier",
    animated: false,
    style: {
        stroke: "#2684ff",
        strokeWidth: 2,
    },
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#2684ff",
    },
};

export const FlowDiagram = () => {
    const { selectedStrategy } = useStrategy();

    const createNodesAndEdges = (steps: string[]) => {
        const startX = 400;
        const startY = 50;
        const verticalSpacing = 150;

        const nodes: Node[] = steps.map((step, index) => ({
            id: `${index + 1}`,
            type: "custom",
            position: {
                x: startX,
                y: startY + index * verticalSpacing,
            },
            data: {
                label: step.replace(/^\d+\.\s*/, ""),
                step: index + 1,
            },
        }));

        const edges: Edge[] = steps.slice(0, -1).map((_, index) => ({
            id: `e${index + 1}-${index + 2}`,
            source: `${index + 1}`,
            target: `${index + 2}`,
            type: "bezier",
            animated: false,
            style: { stroke: "#2684ff", strokeWidth: 2 },
            curvature: 0.3,
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#2684ff",
            },
            sourceHandle: "source",
            targetHandle: "target",
        }));

        return { nodes, edges };
    };

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (selectedStrategy?.strategy_flow) {
            const { nodes: newNodes, edges: newEdges } = createNodesAndEdges(
                selectedStrategy.strategy_flow
            );
            setNodes(newNodes);
            setEdges(newEdges);
        } else {
            setNodes([]);
            setEdges([]);
        }
    }, [selectedStrategy, setNodes, setEdges]);

    return (
        <div className={styles.container}>
            <ReactFlow
                defaultViewport={{ x: 0, y: 0, zoom: 0 }}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineType={ConnectionLineType.Bezier}
                fitView
                fitViewOptions={{
                    duration: 1000,
                }}
            >
                <Background />
            </ReactFlow>
        </div>
    );
};
