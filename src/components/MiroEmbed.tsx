
import React from 'react';

const MiroEmbed = () => (
  <div className="w-full h-[600px] rounded-lg overflow-hidden border border-gray-700 shadow">
    <iframe
      src="https://miro.com/app/live-embed/uXjVIzIu7OA=/?moveToViewport=-493,-244,1884,1120&embedId=180873830308&embedAutoplay=true&embedMode=view_only&frameMode=embed&showHeader=false&partialScreenshot=false&mapControls=0&pan=0&zoom=0"
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
