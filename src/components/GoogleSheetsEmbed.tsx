
import React from 'react';

const GoogleSheetsEmbed = () => (
  <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-700 shadow">
    <iframe
      src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQPR25rcbciHiCu5PlEIwGaRRsS99bbUQPqnUmJpkOokoF1Eg8AxDDd6cr9HGdmJAHmhMKY7hnLJK54/pubhtml?widget=true&amp;headers=false"
      width="100%"
      height="100%"
      allowFullScreen
      frameBorder="0"
      title="Analytics Dashboard"
    />
  </div>
);

export default GoogleSheetsEmbed;
