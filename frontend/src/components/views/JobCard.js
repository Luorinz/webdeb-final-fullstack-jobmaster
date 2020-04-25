import React from 'react';
import {MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol} from 'mdbreact';


export default class JobCard extends React.Component {
    clickHandler=()=>{
        if (this.props.isLogin) {
            this.props.saveJob(this.props.token, this.props.job);
        } else {
            alert("You need to login before save jobs!");
        }
    }

    replaceQuote(string) {
        let newString = string.replace(/&quot;/g, "\"");
        newString = newString.replace(/&#039;/g, "'");
        newString = newString.replace(/&ldquo;/g,"'");
        newString = newString.replace(/&rsquo;/g,"'");
        newString = newString.replace(/<\/?strong>/g, " " );
        newString = newString.replace(/undefined;/g," ");
       
        
    return newString;
  };


    render() {
        return (
            <MDBCol style={{ maxWidth: "22rem"}}>
                <MDBCard>
                    <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                  waves />
                    <MDBCardBody>
                        <MDBCardTitle><span className="badge badge-default"  >Job Title:</span><span> </span>{this.props.job.title}</MDBCardTitle>
                        <MDBCardText><span  >Location:</span><span> </span>{this.replaceQuote(this.props.job.location.display_name)}</MDBCardText>
                        <MDBCardText><span  >Company:</span><span> </span>{this.props.job.company.display_name}</MDBCardText>
                        <MDBCardText><span className="badge badge-default" >Job URL:</span><span> </span>{this.props.job.redirect_url}</MDBCardText>
                        <MDBBtn onClick={this.clickHandler}>Save Job</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        );
    }
}