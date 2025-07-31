
import React from 'react';
import type { Workflow, NodeData } from '../types';
import { N8NLogo } from './icons';

interface WorkflowDiagramProps {
  workflow: Workflow;
}

const getNodeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'trigger':
      return 'border-green-500 bg-green-500/10';
    case 'action':
      return 'border-blue-500 bg-blue-500/10';
    case 'logic':
      return 'border-purple-500 bg-purple-500/10';
    default:
      return 'border-gray-500 bg-gray-500/10';
  }
};

const Node: React.FC<{ node: NodeData }> = ({ node }) => (
  <div
    id={node.id}
    className={`absolute flex items-center p-3 rounded-lg border-2 shadow-lg transition-all duration-300 transform hover:scale-105 ${getNodeColor(node.type)}`}
    style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
  >
    <N8NLogo className="w-6 h-6 mr-3 text-gray-400" />
    <span className="font-semibold text-sm text-gray-200">{node.label}</span>
  </div>
);


export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({ workflow }) => {
  const { nodes, edges } = workflow;

  return (
    <div className="relative w-full h-80 bg-gray-900/50 border border-gray-700 rounded-lg p-4 overflow-hidden backdrop-blur-sm">
      <div className="absolute inset-0 bg-grid-gray-700/10 [mask-image:linear-gradient(to_bottom,white_0,white_100px,transparent)]"></div>
      <style>{`
        .bg-grid-gray-700\\/10 {
            background-image:
                linear-gradient(to right, rgba(107, 114, 128, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(107, 114, 128, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
        }
      `}</style>
      
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="0"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" />
          </marker>
        </defs>
        {edges.map(edge => {
          const sourceNode = nodes.find(n => n.id === edge.source);
          const targetNode = nodes.find(n => n.id === edge.target);

          if (!sourceNode || !targetNode) return null;

          const p1 = { x: sourceNode.x, y: sourceNode.y };
          const p2 = { x: targetNode.x, y: targetNode.y };

          return (
            <line
              key={edge.id}
              x1={`${p1.x}%`}
              y1={`${p1.y}%`}
              x2={`${p2.x}%`}
              y2={`${p2.y}%`}
              stroke="#6b7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          );
        })}
      </svg>
      
      {nodes.map(node => (
        <Node key={node.id} node={node} />
      ))}
    </div>
  );
};