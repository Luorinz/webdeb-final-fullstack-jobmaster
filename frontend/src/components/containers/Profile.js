import React, { Component } from 'react';
import Footer from '../views/Footer';
import {
  MDBContainer,
  MDBCard, MDBCardImage, MDBCardBody,
  MDBCardTitle, MDBCardText, MDBBtn,
  MDBCol, MDBLink
} from "mdbreact";
import Header from "../views/Header";
import {connect} from "react-redux";
import getProfile from "../../redux/action/profileActions";




class Profile extends Component {
  constructor(props) {
    super(props);
    this.props.fetchProfile(this.props.username);
  }

    render() {
        console.log(this.props.profile.role);
        return(
            <div className="mx-0 px-0">
                <Header/>
                <br/>
                <MDBContainer>
                <br/>
                <div className="d-flex justify-content-center">
                  <MDBCol style={{ maxWidth: "22rem" }}>
                        <MDBCard>
                        <MDBCardImage className="img-fluid" src='https://mdbootstrap.com/img/Photos/Horizontal/People/6-col/img%20%283%29.jpg'
                            waves />
                        <MDBCardBody>
                          <MDBCardTitle>{this.props.profile.username}<span><MDBLink to="/userinfo">Edit</MDBLink></span></MDBCardTitle>
                          <MDBCardText>{this.props.profile.email}</MDBCardText>
                          <MDBLink to="/save"><MDBBtn>Save</MDBBtn></MDBLink>
                          <MDBLink to="/post">
                            <MDBBtn onClick={(e)=>{
                              if (this.props.profile.role !== "ROLE_ADV_USER" && this.props.profile.role !== "ROLE_ADMIN") {
                                alert("You do not have enough authority.")
                                e.preventDefault();
                              }
                            }}>
                              Post
                            </MDBBtn>
                          </MDBLink>
                          <MDBLink to="/review">
                            <MDBBtn onClick={(e)=>{
                            if (this.props.profile.role !== "ROLE_ADMIN") {
                              alert("You do not have enough authority.")
                              e.preventDefault();}}}>
                              Review
                            </MDBBtn>
                          </MDBLink>
                        </MDBCardBody>
                        </MDBCard>
                  </MDBCol>
                </div>
                </MDBContainer>
                <Footer/>
            </div>
      
        )
    }
}
function mapStateToProps (state) {
  return {
    username: state.account.userDetail.username,
    profile: state.profile.profile,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    fetchProfile: (username) => dispatch(getProfile(username))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);