import React from "react";
import {MDBContainer, MDBInputGroup, MDBBtn, MDBLink, MDBAnimation, MDBRow, MDBCol,MDBBadge} from "mdbreact";
import logo from '../../pictures/logo.png'
import Footer from "../views/Footer"
import {connect} from "react-redux";
import {logout} from "../../redux/action/accountActions";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      word:""
    }
  }
  upRight=()=>{
    if (!this.props.isLogin) {
      return (
        <MDBRow>
          <MDBCol size={8}> </MDBCol>
          <MDBCol size={2}>
            <MDBLink to={'/userlogin'}><MDBBadge color="primary">Sign in</MDBBadge></MDBLink>
          </MDBCol>
          <MDBCol size={2}>
            <MDBLink to={'/register'}><MDBBadge color="primary">Register</MDBBadge></MDBLink>
          </MDBCol>
        </MDBRow>
      );
    }
    return (
      <MDBRow>
        <MDBCol size={8}> </MDBCol>
        <MDBCol size={2}>
          <MDBLink to={"/profile"}><MDBBadge color="primary">Profile</MDBBadge></MDBLink>
        </MDBCol>
        <MDBCol size={2}>
          <MDBLink to={"/"}>
            <MDBBadge color="primary" onClick={()=>this.props.logout(this.props.token)}>Sign out</MDBBadge>
          </MDBLink>
        </MDBCol>
      </MDBRow>
    )
  }

  checkInput=(event)=>{
    if(this.state.word===""){
      alert("Please go back and type a keyword to search.");
      event.preventDefault();
      return false;
    }else{
      return true;
    }
  }
  render() {
    return (
      <div>
      <MDBContainer>
        {this.upRight()}
        <MDBAnimation type="jackInTheBox" delay="0.5s">
          <div className="center">
            <img src={logo} alt="Logo" />
          </div>
        </MDBAnimation>
        <MDBInputGroup
          material
          containerClassName="mb-3 mt-0"
          hint="Enter Keyword for jobs"
          onChange={(e)=>{this.setState({word: e.target.value})}}
          append={
            <MDBLink to={`/home/${this.state.word}`} onClick={this.checkInput}>
              <MDBBtn gradient="blue" className="m-0 px-3 py-2 z-depth-0">
                Search
              </MDBBtn>
            </MDBLink>
          }
        />
      </MDBContainer>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Footer/>
      </div>
    );
  }
}


function mapStateToProps (state) {
  return {
    isLogin: (!state.account) ? false : state.account.isLogin,
    token: (!state.account) ? "" : state.account.token,
    keyPair: (!state.account) ? {} : {
      username: state.account.userDetail.username,
      password: state.account.userDetail.password,
    }
  }
}

function mapDispatchToProps (dispatch) {
  return {
    logout:(token)=> dispatch(logout(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Search);
