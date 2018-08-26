import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function ErrorBoundaryDecorator(Target) {
  return function (props) {
    return <ErrorBoundary><Target/></ErrorBoundary>
  }
}

function wrapTryCatch(Component) {
  console.log('### wrapTryCatch')
  let oldRender = Component.prototype.render;
  Component.prototype.render = function() {
    console.log('### wrapTryCatch render');
      try {
          return oldRender.apply(this, arguments);
      } catch(e) {
          console.log('### wrapTryCatch', e);
          return null;
      }
  }

  return Component;
}

export { ErrorBoundary, wrapTryCatch };
export default ErrorBoundaryDecorator;