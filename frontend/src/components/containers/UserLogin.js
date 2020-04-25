import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn,
  MDBNavLink,
  MDBInput,
  MDBAnimation
} from "mdbreact";

import Footer from "../views/Footer"
import {connect} from "react-redux";
import {login, resetAccount} from "../../redux/action/accountActions";
import {Redirect} from "react-router";

class UserLogin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username:"",
      password:"",
    }
  }

  render() {
    let reaction=()=> {
      if (this.props.inFlight === false) {
        if (this.props.requestStatus === "LOGIN_SUCCESS"|| this.props.isLogin)
          return (<Redirect to={"/"}/>);
        else if (this.props.requestStatus === "ERROR") {
          alert("username or password is wrong!");
          this.props.reset();
        }
      }
      return null;
    }
    return (
      <div id="videobackground">
        <div className="bg">
          <MDBContainer  >
            {/* <div class="d-flex justify-content-center"> */}
            <MDBAnimation
                type="fadeInRight"
                delay=".5s"

            >
              <MDBRow>
                <MDBCol md="6">

                  <MDBCard>
                    <MDBCardBody>
                      <MDBCardHeader className="form-header deep-blue-gradient rounded">
                        <h3 className="my-3">
                          <MDBIcon icon="lock"  /> User Login:
                        </h3>
                      </MDBCardHeader>
                      <form onSubmit={e=>e.preventDefault()}>
                        <div className="grey-text">
                          <MDBInput
                              label="Type your username"
                              icon="envelope"
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              onChange={e=>this.setState({"username": e.target.value})}
                          />
                          <MDBInput
                              label="Type your password"
                              icon="lock"
                              group
                              type="password"
                              validate
                              onChange={e=>this.setState({"password": e.target.value})}
                          />
                        </div>
                        {reaction()}

                        <div className="text-center mt-4">
                          <MDBBtn
                              color="light-blue"
                              className="mb-3"
                              type="submit"
                              disabled={this.props.inFlight}
                              onClick={()=>this.props.login(this.state)}
                          >
                            Login
                          </MDBBtn>
                        </div>
                      </form>
                      <MDBModalFooter>
                        <div className="font-weight-light">
                          <MDBNavLink to="/register">Not a member? Sign Up</MDBNavLink>
                          <MDBNavLink to="/AdminLogin">Login as Admin</MDBNavLink>
                        </div>
                      </MDBModalFooter>
                    </MDBCardBody>
                  </MDBCard>

                </MDBCol>
              </MDBRow>
              {/* </div> */}
            </MDBAnimation>
          </MDBContainer>

          <MDBContainer>
            <MDBRow className="py-5">
              <MDBCol md="12" className="text-center">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </MDBCol>
            </MDBRow>

          </MDBContainer>
          <Footer/>
        </div>
      </div>
    );
  }


}

function mapDispatchToProps(dispatch) {
  return {
    login: (keyPair) => { dispatch(login(keyPair));},
    reset: ()=>dispatch(resetAccount())
  }
}
function mapStateToProps (state) {
  return {
    inFlight:state.account.inFlight,
    requestStatus:state.account.requestStatus,
    isLogin: state.account.isLogin
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserLogin);