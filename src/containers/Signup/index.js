import React, { Component } from 'react';
import {firebaseAuth,firebaseDB,firebaseStorage} from '../../firebase';
import {withRouter} from 'react-router-dom';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state={
      givenName: "",
      familyName: "",
      sei: "",
      mei: "",
      iconFile: "",
      iconSrc: "",
    };

    this.onTextChange=this.onTextChange.bind(this);
    this.onSendProfile=this.onSendProfile.bind(this);
  }

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user=>{
      if(!user) this.props.history.push('/login');
    });
  }

  onTextChange(e){
    switch(e.target.name){
      case 'givenName':
        this.setState({
          givenName: e.target.value,
        });
        break;
      case 'familyName':
        this.setState({
          familyName: e.target.value,
        });
        break;
      case 'sei':
        this.setState({
          sei: e.target.value,
        });
        break;
      case 'mei':
        this.setState({
          mei: e.target.value,
        });
        break;
      case 'icon':
        if(!e.target.files[0])return;
        this.resizeImage(e.target.files[0]);
        break;
    }
  }

  resizeImage(iconFile){
    let image=new Image();
    image.onload=()=>{
      let width=image.width;
      let height=image.height;
      let maxWidth=256;
      if(width<maxWidth){
        this.setState({
          iconFile: iconFile,
          iconSrc: URL.createObjectURL(iconFile),
        });
        return;
      }
      else{
        let scale=maxWidth/width;
        let dstHeight=height*scale;
        let canvas=document.createElement('canvas');
        canvas.width=maxWidth;
        canvas.height=dstHeight;
        let ctx=canvas.getContext('2d');
        ctx.drawImage(image,0,0,maxWidth,dstHeight);

        let resizedImage=canvas.toDataURL('image/png');
        canvas.toBlob((blob)=>{
          this.setState({iconFile: blob});
        });
        this.setState({iconSrc: resizedImage});
      }
    };
    image.src=URL.createObjectURL(iconFile);
  }

  onSendProfile(e){
    if(this.state.givenName==""){
      alert('givenName empty');
      return;
    }
    else if(this.state.familyName==""){
      alert('familiName empty');
      return;
    }
    else if(this.state.sei==""){
      alert('name empty');
      return;
    }
    else if(this.state.mei==""){
      alert('name empty');
      return;
    }
    else if(this.state.iconFile==""){
      alert('icon empty');
      return;
    }
    firebaseDB.ref('users/'+this.props.location.state.ref).set({
      "given": this.state.givenName,
      "family": this.state.familyName,
      "sei": this.state.sei,
      "mei": this.state.mei,
    });
    //firebaseDB.ref('accounts/'+this.props.location.state.ref).update({'registered': true});
    
    let storageRef=firebaseStorage.ref().child(
      'icons/'+this.props.location.state.ref);
    storageRef.put(this.state.iconFile).then((snapshot)=>{
      this.props.history.push({
        pathname: '/users',
      });
    });
  }

  render() {
    return (
      <div className="Login">
        <h1>Welcome. Who Are You?</h1>
        <div>
          <label>given name</label>
          <input type="text" name="givenName" onChange={this.onTextChange}/>
        </div>
        <div>
          <label>family name</label>
          <input type="text" name="familyName" onChange={this.onTextChange}/>        
        </div>
        <div>
          <label>名</label>
          <input type="text" name="mei" onChange={this.onTextChange}/>
        </div>
        <div>
          <label>姓</label>
          <input type="text" name="sei" onChange={this.onTextChange}/>
        </div>
        <div>
          <img src={this.state.iconSrc} />
          <input type="file" accept="image" name="icon" onChange={this.onTextChange}/>
        </div>
        <div>
          <input type="checkbox"/>
          チェキ~
        </div>
        <button onClick={this.onSendProfile}>GO</button>
      </div>
    );
  }
}

export default withRouter(Signup);
