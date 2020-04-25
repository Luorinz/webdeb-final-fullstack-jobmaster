import React, { Component } from "react";
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,
  MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline, MDBBtn,
} from "mdbreact";
import SearchBar from './SearchBar'
import {logout} from "../../redux/action/accountActions";
import {connect} from "react-redux";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}
  upRight=()=>{
    if (!this.props.isLogin) {
      return (
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink to="/userlogin">
              <MDBBtn>Sign In</MDBBtn>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/register">
              <MDBBtn>Register</MDBBtn>
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      );
    }
    return (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/profile">
            <MDBBtn>Profile</MDBBtn>
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/">
            <MDBBtn onClick={()=>this.props.logout(this.props.token)}>Sign out</MDBBtn>
          </MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    )
  }

render() {

  return (

      <MDBNavbar color="near-moon-gradient" light expand="lg" className="navbar-expand-lg">
        <MDBNavLink to="/">
          <MDBNavbarBrand>
            <strong>Job Search</strong>
          </MDBNavbarBrand>
        </MDBNavLink>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  {/* <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" /> */}
                  <SearchBar/>
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {this.upRight()}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    
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

export default connect(mapStateToProps,mapDispatchToProps)(NavbarPage);
