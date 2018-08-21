import React, { Component } from 'react';
import {firebaseDB} from '../../firebase';

class App extends Component {
  constructor(props){
    super(props);
    this.state={image_src: ""};
  }

  onSendProfile(e){
    e.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <h1>Welcome. Who Are You?</h1>
        <input type="text"/>
        <input type="text"/>
        <input type="text"/>
        <input type="text"/>
        <input type="file" ref="file"/>
        <img src={this.state.image_src} />
        <input type="checkbox"/>
        <button>GO</button>
        <h1>{this.props.location.state.email}</h1>
      </div>
    );
  }
}

export default App;
