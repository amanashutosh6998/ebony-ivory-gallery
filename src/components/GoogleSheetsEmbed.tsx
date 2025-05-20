
import React from 'react';

const GoogleSheetsEmbed = () => (
  <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-700 shadow">
    <iframe
      src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQPR6O-Zn0OGg3-CdUC6w9_XoKRGxYgstqL-tNBwSR6OzNYGpF-5D0xbLxuQK0Od7gXnmxzwVjcJhXU/pubhtml?widget=true&amp;headers=false"
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
