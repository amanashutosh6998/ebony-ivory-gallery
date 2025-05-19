
import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Scatter 
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegend } from '@/components/ui/chart';

// Sample data for visualization - this can be customized
const sampleData = [
  { day: 'Day 1', ingest: 4200, process: 2400, enrich: 1800, storage: 3200 },
  { day: 'Day 2', ingest: 3000, process: 1800, enrich: 1300, storage: 2800 },
  { day: 'Day 3', ingest: 5000, process: 3800, enrich: 2800, storage: 4500 },
  { day: 'Day 4', ingest: 2780, process: 1908, enrich: 1680, storage: 2580 },
  { day: 'Day 5', ingest: 6890, process: 4800, enrich: 3800, storage: 5890 },
  { day: 'Day 6', ingest: 3390, process: 2300, enrich: 1500, storage: 3100 },
  { day: 'Day 7', ingest: 4490, process: 3200, enrich: 2100, storage: 4000 },
];

interface AwsDataFlowChartProps {
  chartType?: 'line' | 'area' | 'bar' | 'composed';
  showIngest?: boolean;
  showProcess?: boolean;
  showEnrich?: boolean;
  showStorage?: boolean;
  height?: number;
}

const AwsDataFlowChart: React.FC<AwsDataFlowChartProps> = ({
  chartType = 'line',
  showIngest = true,
  showProcess = true,
  showEnrich = true,
  showStorage = true,
  height = 300,
}) => {
  const config = {
    ingest: { color: '#8884d8', label: 'Data Ingestion' },
    process: { color: '#82ca9d', label: 'Data Processing' },
    enrich: { color: '#ffc658', label: 'Data Enrichment' },
    storage: { color: '#ff8042', label: 'Data Storage' }
  };
  
  const renderChart = () => {
    switch(chartType) {
      case 'area':
        return (
          <AreaChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
            <Legend content={(props) => <ChartLegend {...props} />} />
            {showIngest && <Area type="monotone" dataKey="ingest" stroke={config.ingest.color} fill={`${config.ingest.color}33`} />}
            {showProcess && <Area type="monotone" dataKey="process" stroke={config.process.color} fill={`${config.process.color}33`} />}
            {showEnrich && <Area type="monotone" dataKey="enrich" stroke={config.enrich.color} fill={`${config.enrich.color}33`} />}
            {showStorage && <Area type="monotone" dataKey="storage" stroke={config.storage.color} fill={`${config.storage.color}33`} />}
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
            <Legend content={(props) => <ChartLegend {...props} />} />
            {showIngest && <Bar dataKey="ingest" fill={config.ingest.color} />}
            {showProcess && <Bar dataKey="process" fill={config.process.color} />}
            {showEnrich && <Bar dataKey="enrich" fill={config.enrich.color} />}
            {showStorage && <Bar dataKey="storage" fill={config.storage.color} />}
          </BarChart>
        );
        
      case 'composed':
        return (
          <ComposedChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
            <Legend content={(props) => <ChartLegend {...props} />} />
            {showIngest && <Area type="monotone" dataKey="ingest" fill={`${config.ingest.color}33`} stroke={config.ingest.color} />}
            {showProcess && <Line type="monotone" dataKey="process" stroke={config.process.color} />}
            {showEnrich && <Bar dataKey="enrich" fill={config.enrich.color} />}
            {showStorage && <Scatter dataKey="storage" fill={config.storage.color} />}
          </ComposedChart>
        );
        
      default:
        return (
          <LineChart data={sampleData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip content={(props) => <ChartTooltipContent {...props} />} />
            <Legend content={(props) => <ChartLegend {...props} />} />
            {showIngest && <Line type="monotone" dataKey="ingest" stroke={config.ingest.color} activeDot={{ r: 8 }} />}
            {showProcess && <Line type="monotone" dataKey="process" stroke={config.process.color} />}
            {showEnrich && <Line type="monotone" dataKey="enrich" stroke={config.enrich.color} />}
            {showStorage && <Line type="monotone" dataKey="storage" stroke={config.storage.color} />}
          </LineChart>
        );
    }
  };
  
  return (
    <ChartContainer 
      config={config}
      className="bg-gray-900/50 rounded-lg border border-gray-800 p-4"
    >
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AwsDataFlowChart;
