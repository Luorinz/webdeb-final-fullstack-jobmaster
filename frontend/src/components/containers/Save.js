import React, { Component } from 'react';
import Footer from '../views/Footer';
import GuestHeader from '../views/Header';
import {connect} from "react-redux";
import {MDBContainer, MDBRow} from "mdbreact";
import {deleteFromSavedList,fetchSavedList} from "../../redux/action/savedListActions";
import SaveCard from "../views/SaveCard";



class Save extends Component {
  constructor(props) {
    super(props);
    this.props.fetchSavedList(this.props.token, ()=>alert("failed to fetch save list!"));
  }

  render() {
    console.log(this.props.savedList)
    let jobListViews = this.props.savedList.map(job => {
      return (
        <div>
          <SaveCard job={job} token={this.props.token}
                   unsaveJob={this.props.unsaveJob}/><br/>
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
    fetchSavedList: (token, errHandler) => { dispatch(fetchSavedList(token, errHandler));},
    unsaveJob:(token, job, errHandler)=>
      dispatch(deleteFromSavedList(token, job, errHandler))
  }
}
function mapStateToProps (state) {
  console.log(state.account);
  return {
    savedList: state.savedList,
    token: state.account.token,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Save);