import { useEffect } from 'react';

const MIDA_PROJECT_KEY = '34MV9Wnqd0wl6BXrGNLpJw';

const MidaScript = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById('mida-optimize-script')) {
      return;
    }

    // Create script element for Mida A/B Testing
    const script = document.createElement('script');
    script.id = 'mida-optimize-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://cdn.mida.so/js/optimize.js?key=${MIDA_PROJECT_KEY}`;

    // Add script to head
    document.head.appendChild(script);

    // Cleanup function (optional, script will persist)
    return () => {
      const existingScript = document.getElementById('mida-optimize-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default MidaScript;

