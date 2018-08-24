import React, { Component } from 'react';
import {firebaseDB, firebaseAuth, firebaseStorage} from '../../firebase';
import {withRouter,Link} from "react-router-dom"

class Users extends Component {
  constructor(props){
    super(props);
    this.state={
      authenticated: false,
      currentUser: null,
      users: [],
    };
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(!user){
        this.props.history.push('/login');
      }
      else{
        let imageRef=firebaseDB.ref('users');
        imageRef.on('child_added',(snapshot)=>{
          let id=snapshot.key;
          let val=snapshot.val();
          this.downloadImage(id,val.given,val.family);
        });

      }
    });
  }

  downloadImage(id,given,family){
    let storageRef=firebaseStorage.ref('icons/'+id);
    storageRef.getDownloadURL().then((url)=>{
      let usrs=this.state.users;
      usrs.push({
        'id': id,
        'givenName': given,
        'familyName': family,
        'icon': url
      });
      this.setState({users: usrs});
    });
  }

  onLinkToProfile(id,iconSrc){
    this.props.history.push({
      pathname: `/users/${id}`,
      state: {
        id: id,
        icon: iconSrc,
      },
    });
  }

  render() {
    return (
      <div className="Users">
        <button>RANDOM</button>
        {this.state.users.map(user=>{
            return (
              <div className="User">
                <button onClick
                ={()=>this.onLinkToProfile(user.id,user.icon)}>
                  <img src={user.icon} />
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

export default withRouter(Users);
