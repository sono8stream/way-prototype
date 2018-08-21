import React, { Component } from 'react';
import {firebaseAuth} from '../../firebase';
import {Redirect} from "react-router-dom"

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loading:true,
      authenticated: false,
      currentUser: null,
    };
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(user){
        this.setState({
          loading: false,
          authenticated: true,
          currentUser: user
        });
      }
      else{
        this.setState({
          loading: false,
          authenticated: false,
          currentUser: null
        })
      }
    })
  }

  render() {

    const{authenticated, loading}=this.state;

    if(loading) return <p>loading..</p>;

    if(authenticated===false){
      return <Redirect to="/"/>
    }

    return (
      <div className="Login">
        <h1>RANDOM</h1>
        <button>Users</button>
      </div>
    );
  }
}

export default App;
