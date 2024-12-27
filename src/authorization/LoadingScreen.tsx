import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000); // Adjust this value to control how long the loading screen is shown

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <video
        className="w-full h-full object-cover"
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-XZT9xcec1anb6A8lUEueQkdMJMoR8x.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default LoadingScreen;

