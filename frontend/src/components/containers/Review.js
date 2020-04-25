import React, { Component } from 'react';
import Footer from '../views/Footer';
import GuestHeader from '../views/Header';
import {connect} from "react-redux";
import {MDBContainer, MDBRow} from "mdbreact";
import {updateToPassed,updateToReviewed,fetchReviewedList} from "../../redux/action/reviewedListActions";
import ReviewCard from "../views/ReviewCard";



class Review extends Component {
  constructor(props) {
    super(props);
    this.props.fetchReviewedList(this.props.token, ()=>alert("failed to fetch Review list!"));
  }

  render() {
    let jobListViews = this.props.reviewedList.map(job => {
      return (
        <div>
          <ReviewCard job={job} token={this.props.token}
                   pass={this.props.updateToPassed}
                   review={this.props.updateToReviewed}
          /><br/>
        </div>
      )
    });


    return(
      <div className="mx-0 px-0">

        <GuestHeader/>
        <br/>
        <MDBContainer>
          <div className="d-flex justify-content-center">
            <MDBRow>{jobListViews}</MDBRow>
          </div>
        </MDBContainer>
        <Footer/>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReviewedList: (token, errHandler) => { dispatch(fetchReviewedList(token, errHandler));},
    updateToPassed:(token, job, errHandler)=>dispatch(updateToPassed(token, job, errHandler)),
    updateToReviewed:(token, job, errHandler)=>dispatch(updateToReviewed(token, job, errHandler))
  }
}
function mapStateToProps (state) {
  return {
    reviewedList: state.reviewedList,
    token: state.account.token,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Review);