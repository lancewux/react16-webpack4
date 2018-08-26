import React, { Component } from 'react';
import Header from './Header'
import  ErrorBoundaryDecorator, { ErrorBoundary, wrapTryCatch } from './ErrorBoundary';

function ss(props) {
  return <div className='decorator'></div>;
}
function dd(a) {
  return function (props) {
    return <div className='decorator'><a/></div>;
  }
}
function testable(Target) {
  // // target.isTestable = true;
  // target.prototype.conponentDidMount = function() {
  //   console.log('### home conponentDidMount');
  // }
  console.log('### target', Target);
  return function (props) {
    return <div className='decorator'><Target/></div>;
  }
}

@wrapTryCatch
class Home extends Component {
  constructor(props) {
    super(props);
    console.log('### Home constructor.')
  }
  componentWillMount() {
    const a = 'ab';
    console.log('### Home componentWillMount', a);
  }
  componentDidMount() {
    const a = 'ab';
    console.log('### Home componentDidMount', a);
  }
  render() {
    // console.log(c);
    return (
      <div className="home">
        {/* <ErrorBoundary> */}
          <Header />
        {/* </ErrorBoundary> */}
        <p>home..!!! </p>
      </div>
    );
  }
}

export default Home;