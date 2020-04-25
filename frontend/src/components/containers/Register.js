import React from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBAnimation
} from "mdbreact";
import "../../style/styles.css";
import Footer from "../views/Footer"
import Axios from "axios";
import {HEROKU_PATH} from "../../rootPath";

class Register extends React.Component {
  state = {
    username:"",
    password:"",
    email:"",
    role:""
  };

  register = async () => {
    try {
      await Axios.post(`${HEROKU_PATH}/auth/register`, this.state);
      alert("Success!");
      this.props.history.push("/");
    } catch (e) {
      alert("Please provide different username and email address.");
    }
  }
;
  render() {
    return (
      <div id="classicformpage">
        

        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBAnimation
                  type="fadeInLeft"
                  delay=".3s"
                  className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                >
                  <h1 className="h1-responsive font-weight-bold">
                    Sign up right now!
                  </h1>
                  <hr className="hr-light" />
                  <h6 className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                    veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                    molestiae, quisquam iste, maiores. Nulla.
                  </h6>
                  <MDBBtn outline color="white">
                    Learn More
                  </MDBBtn>
                </MDBAnimation>

                <MDBCol md="6" xl="5" className="mb-4">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <MDBCard id="classic-card">
                      <MDBCardBody className="white-text">
                        <h3 className="text-center">
                          <MDBIcon icon="user" /> Register:
                        </h3>
                        <hr className="hr-light" />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your name"
                          icon="user"
                          onChange={(e)=>this.setState({username: e.target.value})}
                        />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your email"
                          icon="envelope"
                          onChange={(e)=>this.setState({email: e.target.value})}
                        />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your role"
                          icon="lock"
                          type="text"
                          onChange={(e)=>this.setState({role: e.target.value})}
                        />
                        <MDBInput
                          className="white-text"
                          iconClass="white-text"
                          label="Your password"
                          icon="lock"
                          type="password"
                          onChange={(e)=>this.setState({password: e.target.value})}
                        />

                        <div className="text-center mt-4 black-text">
                          <MDBBtn onClick={this.register} color="indigo">Sign Up</MDBBtn>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

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
    );
  }
}

export default Register;