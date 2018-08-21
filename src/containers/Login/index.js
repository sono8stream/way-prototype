import React, { Component } from 'react';
import {firebaseDB,firebaseAuth} from '../../firebase';
import {withRouter} from 'react-router-dom';

const ref = firebaseDB.ref('accounts');

class Login extends Component {
  constructor(props){
    super(props);
    this.handleLogin=this.handleLogin.bind(this);

    firebaseAuth().getRedirectResult().then((result)=>{
      if(result.credential!=null){
        var idRef;
        ref.orderByChild('email').equalTo(result.user.email)//メールアドレスが既に登録されているか
          .once('value',(snapshot)=>{
            if(snapshot.val()==null){
              idRef=ref.push();
              idRef.set({
                email: result.user.email,
                token: result.credential.accessToken,
                registered: false,
              }).then((result)=>{
                /*this.props.history.push({
                  pathname: '/signup',
                  state: {email: refId.key},
                });*/
                this.redirect('/signup',idRef);
              });
            }
            else{
              let registered;
              snapshot.forEach((childSnapshot)=>{
                registered=childSnapshot.child('registered').val();
                idRef=childSnapshot.key;
              });

              if(registered){

              }
              else{
                this.redirect('/signup',idRef);
              }
              /*this.props.history.push({
                pathname: '/users',
                state: {token: this.state.token, user: this.state.user},
              });*/
            }
          });
      }
    });
  }

  redirect(path,refKey){
    this.props.history.push({
      pathname: path,
      state: {ref: refKey},
    });

  }

  async handleLogin(e){//ポップアップログイン後にsignupに遷移
    e.preventDefault();
    const provider=new firebaseAuth.GithubAuthProvider();
    /*await firebaseAuth().signInWithPopup(provider)
      .then((result)=>{
        this.setState({
          token: result.credential.accessToken,
          user: result.user});
        ref.once(result.credential.accessToken).then((snapshot)=>{
          this.setState({token: snapshot.val.token});
        });
        ref.push({
          token: result.credential.accessToken,
          registered: false,
        }).then((result)=>{
        });
        /*this.props.history.push({
          pathname: '/signup',
          state: {token: this.state.token, user: this.state.user},
        });
      });*/
    firebaseAuth().signInWithRedirect(provider);
  }

  render() {
    return (
      <div className="Login">
        <h1 className="Title">WAY</h1>
        <button className="test" onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
