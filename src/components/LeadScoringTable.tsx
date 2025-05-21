
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ScoringCategory {
  category: string;
  description: string;
  maxPoints: string;
}

interface ScoringFactor {
  action: string;
  points: string;
  category?: string;
}

interface LeadScoringTableProps {
  showDetailed?: boolean;
}

const LeadScoringTable: React.FC<LeadScoringTableProps> = ({ showDetailed = false }) => {
  const categories: ScoringCategory[] = [
    { category: "Intent", description: "Forms submitted, high-intent page visits", maxPoints: "+60" },
    { category: "Fit", description: "Email, phone, business info", maxPoints: "+25" },
    { category: "Engagement", description: "Emails + SDR calls (reply, connect)", maxPoints: "+30" },
    { category: "Risk/Decay", description: "Inactivity, bad contact info", maxPoints: "-40" },
    { category: "SQL Threshold", description: "Lead is qualified at", maxPoints: "≥60" }
  ];

  const intentFactors: ScoringFactor[] = [
    { action: "Submitted Get Demo form", points: "+20", category: "Intent" },
    { action: "Pricing quiz, lead magnets", points: "+5–12", category: "Intent" },
    { action: "Visited /pricing page", points: "+10", category: "Intent" },
    { action: "Visited /demo page", points: "+15", category: "Intent" },
    { action: "Visited /compare, /features pages", points: "+6–10", category: "Intent" },
    { action: "Visited ads landing pages", points: "+5–10", category: "Intent" }
  ];

  const fitFactors: ScoringFactor[] = [
    { action: "Valid email", points: "+5", category: "Fit" },
    { action: "Valid phone number", points: "+10", category: "Fit" },
    { action: "Business name", points: "+3", category: "Fit" },
    { action: "Business type + # of locations", points: "+2 to +5", category: "Fit" }
  ];

  const engagementFactors: ScoringFactor[] = [
    { action: "Marketing email open", points: "+1", category: "Engagement" },
    { action: "Marketing email click", points: "+2", category: "Engagement" },
    { action: "Marketing email reply", points: "+10", category: "Engagement" },
    { action: "Marketing email bounce", points: "-5", category: "Engagement" },
    { action: "Sales email open/click", points: "+1 to +2", category: "Engagement" },
    { action: "Sales email reply", points: "+5", category: "Engagement" },
    { action: "SDR call picked & qualified", points: "+10", category: "Engagement" },
    { action: "SDR callback requested", points: "+3", category: "Engagement" },
    { action: "SDR repeated no-pickup", points: "-5", category: "Engagement" },
    { action: "SDR invalid number", points: "-10", category: "Engagement" },
    { action: "SDR call refused/hang-up", points: "-6", category: "Engagement" }
  ];

  const riskDecayFactors: ScoringFactor[] = [
    { action: "15 days no activity", points: "-6", category: "Risk/Decay" },
    { action: "30 days no activity", points: "-6", category: "Risk/Decay" },
    { action: "60–90 days no activity", points: "-12 each", category: "Risk/Decay" },
    { action: "90+ days inactive with no SDR connect", points: "-10", category: "Risk/Decay" },
    { action: "180+ days inactive", points: "Auto-archived", category: "Risk/Decay" }
  ];

  return (
    <div className="w-full my-8">
      <h3 className="text-xl font-semibold mb-4 text-white">🔎 QL Score 2.0 – A Multi-Factor Scoring Model</h3>
      
      {/* Main Scoring Categories Table */}
      <div className="overflow-x-auto mb-6">
        <Table className="border-collapse w-full">
          <TableCaption className="text-white">Lead Scoring Categories</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-800/50">
              <TableHead className="text-white font-medium">Category</TableHead>
              <TableHead className="text-white font-medium">Description</TableHead>
              <TableHead className="text-white font-medium text-right">Max Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index} className="border-t border-gray-700">
                <TableCell className="font-medium text-white">{category.category}</TableCell>
                <TableCell className="text-white">{category.description}</TableCell>
                <TableCell className="text-right text-white">{category.maxPoints}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showDetailed && (
        <>
          {/* Intent Signals Table */}
          <div className="overflow-x-auto mb-6">
            <h4 className="text-lg font-medium mb-2 text-white">🔹 Intent Signals (Max: 60 pts)</h4>
            <Table className="border-collapse w-full">
              <TableHeader>
                <TableRow className="bg-gray-800/50">
                  <TableHead className="text-white font-medium">Action</TableHead>
                  <TableHead className="text-white font-medium text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {intentFactors.map((factor, index) => (
                  <TableRow key={index} className="border-t border-gray-700">
                    <TableCell className="text-white">{factor.action}</TableCell>
                    <TableCell className="text-right text-white">{factor.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Fit Signals Table */}
          <div className="overflow-x-auto mb-6">
            <h4 className="text-lg font-medium mb-2 text-white">🔹 Fit Signals (Max: 25 pts)</h4>
            <Table className="border-collapse w-full">
              <TableHeader>
                <TableRow className="bg-gray-800/50">
                  <TableHead className="text-white font-medium">Action</TableHead>
                  <TableHead className="text-white font-medium text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fitFactors.map((factor, index) => (
                  <TableRow key={index} className="border-t border-gray-700">
                    <TableCell className="text-white">{factor.action}</TableCell>
                    <TableCell className="text-right text-white">{factor.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Engagement Signals Table */}
          <div className="overflow-x-auto mb-6">
            <h4 className="text-lg font-medium mb-2 text-white">🔹 Engagement Signals (Max: 30 pts)</h4>
            <Table className="border-collapse w-full">
              <TableHeader>
                <TableRow className="bg-gray-800/50">
                  <TableHead className="text-white font-medium">Action</TableHead>
                  <TableHead className="text-white font-medium text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engagementFactors.map((factor, index) => (
                  <TableRow key={index} className="border-t border-gray-700">
                    <TableCell className="text-white">{factor.action}</TableCell>
                    <TableCell className="text-right text-white">{factor.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Risk/Decay Table */}
          <div className="overflow-x-auto mb-6">
            <h4 className="text-lg font-medium mb-2 text-white">🔻 Risk / Decay (Penalty: -40 pts)</h4>
            <Table className="border-collapse w-full">
              <TableHeader>
                <TableRow className="bg-gray-800/50">
                  <TableHead className="text-white font-medium">Action</TableHead>
                  <TableHead className="text-white font-medium text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskDecayFactors.map((factor, index) => (
                  <TableRow key={index} className="border-t border-gray-700">
                    <TableCell className="text-white">{factor.action}</TableCell>
                    <TableCell className="text-right text-white">{factor.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default LeadScoringTable;
