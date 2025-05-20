
import React from 'react';
import { Card } from './ui/card';

const AwsCdpFlowDiagram: React.FC = () => {
  return (
    <Card className="bg-gray-900/50 border border-gray-800 p-6 rounded-lg">
      <div className="flex flex-col items-center">
        <h3 className="text-xl font-medium text-white mb-4">AWS CDP Data Flow</h3>
        
        {/* Simple flow diagram visualization */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Data Sources */}
            <div className="bg-blue-900/60 p-4 rounded-md border border-blue-700 w-full md:w-1/4">
              <h4 className="text-blue-300 font-medium mb-2">Data Sources</h4>
              <ul className="text-sm text-gray-300 list-disc pl-4">
                <li>Web Analytics</li>
                <li>CRM Systems</li>
                <li>Marketing Platforms</li>
                <li>Transaction Data</li>
              </ul>
            </div>

            {/* Flow arrow */}
            <div className="hidden md:block text-green-500 text-2xl">→</div>
            <div className="block md:hidden text-green-500 text-2xl">↓</div>

            {/* Processing */}
            <div className="bg-green-900/60 p-4 rounded-md border border-green-700 w-full md:w-1/4">
              <h4 className="text-green-300 font-medium mb-2">Processing</h4>
              <ul className="text-sm text-gray-300 list-disc pl-4">
                <li>Lambda Functions</li>
                <li>Step Functions</li>
                <li>Data Cleansing</li>
                <li>Transformation</li>
              </ul>
            </div>

            {/* Flow arrow */}
            <div className="hidden md:block text-green-500 text-2xl">→</div>
            <div className="block md:hidden text-green-500 text-2xl">↓</div>

            {/* Storage & Analytics */}
            <div className="bg-purple-900/60 p-4 rounded-md border border-purple-700 w-full md:w-1/4">
              <h4 className="text-purple-300 font-medium mb-2">Analytics</h4>
              <ul className="text-sm text-gray-300 list-disc pl-4">
                <li>Redshift</li>
                <li>QuickSight</li>
                <li>Machine Learning</li>
                <li>Segmentation</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section - Output & Actions */}
          <div className="bg-gray-800/80 p-4 rounded-md border border-gray-600 w-full">
            <h4 className="text-cyan-300 font-medium mb-2 text-center">Customer Insights & Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
              <div className="bg-gray-700/50 p-2 rounded">Personalization</div>
              <div className="bg-gray-700/50 p-2 rounded">Campaign Triggers</div>
              <div className="bg-gray-700/50 p-2 rounded">Journey Mapping</div>
              <div className="bg-gray-700/50 p-2 rounded">Predictive Analytics</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-gray-400 text-sm text-center">
          <p>Fully automated data pipeline with real-time processing and analysis.</p>
        </div>
      </div>
    </Card>
  );
};

export default AwsCdpFlowDiagram;
