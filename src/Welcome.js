import React from 'react'; 
class Welcome extends React.Component {
  render() {
    return <div className="notification is-info"><h1>Hello, {this.props.name}'s Component</h1></div>;
  }
}

export default Welcome 