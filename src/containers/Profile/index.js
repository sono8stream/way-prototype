import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import {withRouter, Link} from "react-router-dom"

class Users extends Component {
  constructor(props){
    super(props);
    this.state={
      givenName: "",
      familyName: "",
      icon: "",
    };
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(!user){
        this.props.history.push('/login');
      }
      else{
        let id=this.props.match.params.id;
        if(this.props.location.state===undefined){
          this.downloadImage(id);
        }
        else{
          this.setState({icon: this.props.location.state.icon,});
        }
        let profRef=firebaseDB.ref('users/'+id);
        profRef.on('value',(snapshot)=>{
          let val=snapshot.val();
          this.setState({
            givenName: val.given,
            familyName: val.family,
          });
        });
      }
    });
  }

  downloadImage(id){
    let storageRef=firebaseStorage.ref('icons/'+id);
    storageRef.getDownloadURL().then((url)=>{
      this.setState({icon: url});
    });
  }

  render() {

    return (
      <div className="Profile">
        <div className="Header">
          <Link to="/users">&lt;</Link>
          <button >+</button>
        </div>
        <img src={this.state.icon} />
        <div className="Name">
          <h2>{this.state.givenName} {this.state.familyName}</h2>
        </div>
        <div className="Position">
        
        </div>
        <div className="Project">
        
        </div>
        <div className="Others">
        
        </div>

      </div>
    );
  }
}

export default withRouter(Users);
