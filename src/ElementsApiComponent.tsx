import React, { useEffect } from 'react';

const ElementsApiComponent = ({ apiDescriptionUrl }) => {
  useEffect(() => {
    // Load the script that defines the `elements-api` custom element
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@stoplight/elements/web-components.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Load the stylesheet for the `elements-api` custom element
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/@stoplight/elements/styles.min.css';
    document.head.appendChild(link);

    // Clean up on component unmount
    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <elements-api
      apiDescriptionUrl={apiDescriptionUrl}
      router="hash"
      layout="sidebar"
    />
  );
};

export default ElementsApiComponent;