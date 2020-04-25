import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol} from 'mdbreact';


export default class ReviewCard extends React.Component {
  clickPass=()=>{
      this.props.pass(this.props.token, this.props.job, ()=>alert("pass job failed!"));
  }
  clickReview=()=>{
    this.props.review(this.props.token, this.props.job, ()=>alert("review job failed!"));
  }
  render() {
    console.log(this.props.job);
    return (
      <MDBCol style={{ maxWidth: "22rem"}}>
        <MDBCard>
          <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                        waves />
          <MDBCardBody>
            <MDBCardTitle><span className="badge badge-default"  >Job Title:</span><span> </span>{this.props.job.title}</MDBCardTitle>
            <MDBCardText><span  >Location:</span><span> </span>{this.props.job.location.display_name}</MDBCardText>
            <MDBCardText><span  >Company:</span><span> </span>{this.props.job.company.display_name}</MDBCardText>
            <MDBCardText><span className="badge badge-default" >Job URL:</span><span> </span>{this.props.job.redirect_url}</MDBCardText>
            <MDBBtn disabled={this.props.job.passed} onClick={this.clickPass}>pass</MDBBtn>
            <MDBBtn disabled={this.props.job.underReview} onClick={this.clickReview}>review</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    );
  }
}