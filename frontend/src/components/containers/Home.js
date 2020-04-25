import React, { Component } from 'react';
import Footer from '../views/Footer';
import GuestHeader from '../views/Header';
import JobCard from '../views/JobCard';
import getJobList from "../../redux/action/jobListActions";
import {connect} from "react-redux";
import {MDBContainer, MDBRow} from "mdbreact";
import {addToSavedList} from "../../redux/action/savedListActions";



class Home extends Component {
    constructor(props) {
        super(props);
        let keyword = this.props.match.params.keyword;
        console.log(keyword);
        this.props.getJobList(keyword);
    }

    render() {
        let jobListViews = this.props.jobList.map(job => {
            return (
              <div>
                <JobCard job={job} token={this.props.token}
                         saveJob={this.props.saveJob}
                         isLogin={this.props.isLogin} /><br/>
              </div>
            )
        });

        
        return(
            <div className="mx-0 px-0">

                <GuestHeader/>
                {/* <AdminHeader/> */}
                {/* <UserHeader/> */}
                <br/>
                <MDBContainer>
                <div className="d-flex justify-content-center">
                  <MDBRow>{jobListViews}</MDBRow>
                </div>
                </MDBContainer>
                {/* <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p> */}
                <Footer/>
            </div>
      
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getJobList: (keyword) => { dispatch(getJobList(keyword));},
        saveJob:(token, job)=>
          dispatch(addToSavedList(token, job))
    }
}
function mapStateToProps (state) {
    return {
        jobList: state.jobList.jobList,
        token: state.account.token,
        isLogin: (!state.account) ? false : state.account.isLogin
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);