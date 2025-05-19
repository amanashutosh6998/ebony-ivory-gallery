
import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Cloud, ArrowRight, File, Layers, Link, Settings, Upload, Download } from 'lucide-react';
import { ChartBar as Chart } from 'lucide-react';

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
      style={{ 
        left: x, 
        top: y, 
        width,
        zIndex: 2
      }}
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

const FlowConnection = ({ 
  start, 
  end,
  label,
  animated = true, 
  dashed = false,
  color = "rgba(255,255,255,0.2)" 
}: FlowConnectionProps) => {
  // This is a placeholder for the connections that would be drawn
  // In a real implementation, you'd calculate the path between nodes
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
  // This is a simplified diagram layout
  // In a real implementation, you'd want to use a proper graph visualization library
  return (
    <div className="relative w-full h-[600px] bg-black/50 rounded-lg border border-gray-800 overflow-hidden p-4">
      {/* Data Sources Tier */}
      <FlowNode
        title="CRM Data"
        description="Customer records and interactions"
        icon={<Database size={24} />}
        color="bg-blue-900/50"
        x="5%"
        y="10%"
        delay={0}
      />
      <FlowNode
        title="Website Analytics"
        description="User behavior and events"
        icon={<Chart size={24} />}
        color="bg-green-900/50"
        x="5%"
        y="40%"
        delay={1}
      />
      <FlowNode
        title="Marketing Data"
        description="Campaign and engagement metrics"
        icon={<File size={24} />}
        color="bg-purple-900/50"
        x="5%"
        y="70%"
        delay={2}
      />

      {/* Ingestion Tier */}
      <FlowNode
        title="S3 Data Lake"
        description="Raw data storage"
        icon={<Cloud size={24} />}
        color="bg-cyan-900/50"
        x="30%"
        y="25%"
        width="220px"
        delay={3}
      />
      <FlowNode
        title="Kinesis Data Streams"
        description="Real-time data ingestion"
        icon={<Upload size={24} />}
        color="bg-cyan-900/50"
        x="30%"
        y="55%"
        width="220px"
        delay={4}
      />

      {/* Processing Tier */}
      <FlowNode
        title="Lambda Functions"
        description="ETL processing and transformations"
        icon={<Server size={24} />}
        color="bg-yellow-900/50"
        x="55%"
        y="15%"
        delay={5}
      />
      <FlowNode
        title="Step Functions"
        description="Workflow orchestration"
        icon={<Settings size={24} />}
        color="bg-yellow-900/50"
        x="55%"
        y="40%"
        delay={6}
      />
      <FlowNode
        title="Glue ETL"
        description="Data cataloging and transformation"
        icon={<Layers size={24} />}
        color="bg-yellow-900/50"
        x="55%"
        y="65%"
        delay={7}
      />

      {/* Data Warehouse */}
      <FlowNode
        title="Redshift"
        description="Data warehousing"
        icon={<Database size={24} />}
        color="bg-red-900/50"
        x="80%"
        y="25%"
        delay={8}
      />
      <FlowNode
        title="Customer 360° View"
        description="Unified customer profiles"
        icon={<Link size={24} />}
        color="bg-red-900/50"
        x="80%"
        y="55%"
        delay={9}
      />

      {/* Connections would be drawn here in a real implementation */}
      {/* This is a placeholder, would need proper connection drawing logic */}
    </div>
  );
};

export default AwsCdpFlowDiagram;
