
import React from 'react';

const MiroEmbed = () => (
  <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-700 shadow">
    <iframe
      src="https://miro.com/app/embed/uXjVIzIu7OA=/?pres=1&frameId=3458764629056626025&embedId=377243973745"
      width="100%"
      height="100%"
      allowFullScreen
      frameBorder="0"
      title="Miro Mind Map"
      scrolling="no"
      allow="fullscreen; clipboard-read; clipboard-write"
    />
  </div>
);

export default MiroEmbed;
