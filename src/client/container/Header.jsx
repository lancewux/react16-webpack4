import React, { Component } from 'react';

class Header extends Component {
    componentDidMount() {
        console.log('### componentDidMount');
    }
    render() {
      return (
        <div className="header">
          <p>Header...!</p>
        </div>
      );
    }
  }
  
  export default Header;