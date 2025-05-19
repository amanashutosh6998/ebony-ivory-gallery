import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import mindmapData from './mindmap.json';

interface FlowNodeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  x: string;
  y: string;
  width?: string;
  delay?: number;
}

interface FlowConnectionProps {
  start: string;
  end: string;
  label?: string;
  animated?: boolean;
  dashed?: boolean;
  color?: string;
}

const FlowNode: React.FC<FlowNodeProps> = ({ 
  title, 
  description, 
  icon, 
  color, 
  x, 
  y, 
  width = "180px",
  delay = 0 
}) => {
  return (
    <motion.div 
      className="absolute bg-gray-800/80 rounded-lg border border-gray-700 shadow-lg p-4 flex flex-col items-center text-center"
      style={{ left: x, top: y, width, zIndex: 2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + delay * 0.1 }}
    >
      <div className={`p-3 rounded-full mb-3 ${color}`}>
        {icon}
      </div>
      <h3 className="font-bold text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </motion.div>
  );
};

const FlowConnection: React.FC<FlowConnectionProps> = ({ 
  start, 
  end,
  label,
  animated = true, 
  dashed = false,
  color = "rgba(255,255,255,0.2)" 
}) => {
  return (
    <div 
      className={`absolute ${dashed ? 'border-dashed' : 'border-solid'} ${animated ? 'animate-pulse' : ''}`}
      style={{ 
        left: start,
        top: end,
        borderTop: `2px solid ${color}`,
        width: '50px',
        zIndex: 1
      }}
    >
      {label && (
        <span className="absolute text-xs text-gray-500 -mt-4 ml-2">{label}</span>
      )}
    </div>
  );
};

const AwsCdpFlowDiagram: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] bg-black/50 rounded-lg border border-gray-800 overflow-hidden p-4">
      {mindmapData.nodes.map((node, index) => {
        const Icon = LucideIcons[node.icon as keyof typeof LucideIcons] || LucideIcons.File;
        return (
          <FlowNode
            key={index}
            title={node.title}
            description={node.description}
            icon={<Icon size={24} />}
            color={node.color}
            x={node.x}
            y={node.y}
            width={node.width}
            delay={node.delay}
          />
        );
      })}

      {mindmapData.connections?.map((conn, index) => (
        <FlowConnection key={index} {...conn} />
      ))}
    </div>
  );
};

export default AwsCdpFlowDiagram;
