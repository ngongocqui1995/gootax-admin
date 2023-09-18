import '@lottiefiles/lottie-player';
import React from 'react';

const TaxiBg: React.FC = () => {
  return (
    <div>
      {/* @ts-ignore */}
      <lottie-player
        src="/background/taxi.json"
        background="transparent"
        speed="1"
        style={{ width: '500px', height: '500px' }}
        loop
        autoplay
        id="confirm-loading-lottiefile"
      />
    </div>
  );
};

export default TaxiBg;
