import React from 'react';

class ElementsApiComponent extends React.Component {
  script = null;
  link = null;

  componentDidMount() {
    // Load the script that defines the `elements-api` custom element
    this.script = document.createElement('script');
    this.script.src = 'https://unpkg.com/@stoplight/elements/web-components.min.js';
    this.script.async = true;
    document.body.appendChild(this.script);

    // Load the stylesheet for the `elements-api` custom element
    this.link = document.createElement('link');
    this.link.rel = 'stylesheet';
    this.link.href = 'https://unpkg.com/@stoplight/elements/styles.min.css';
    document.head.appendChild(this.link);
  }

  componentWillUnmount() {
    // Clean up on component unmount
    document.body.removeChild(this.script);
    document.head.removeChild(this.link);
  }

  render() {
    return (
      <elements-api
        apiDescriptionDocument={window.apiDescriptionDocument}
        router="hash"
        layout="sidebar"
      />
    );
  }
}

export default ElementsApiComponent;