
import React from 'react';

const GoogleSheetsEmbed = () => (
  <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-700 shadow">
    <iframe
      src="https://docs.google.com/spreadsheets/d/17kG8_3kw2dwAPLnz5j0o0GDz3ypvvfGMxZuAnBNm_W8/edit?usp=sharing&embedded=true&rm=minimal"
      width="100%"
      height="100%"
      allowFullScreen
      frameBorder="0"
      title="Analytics Dashboard"
      scrolling="no"
    />
  </div>
);

export default GoogleSheetsEmbed;
