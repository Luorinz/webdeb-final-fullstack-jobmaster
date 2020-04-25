import React, { Component } from 'react';
import Footer from '../views/Footer';
import GuestHeader from '../views/Header';
import {connect} from "react-redux";
import {MDBBtn, MDBCol, MDBContainer, MDBLink, MDBRow} from "mdbreact";
import {deleteFromPostedList,fetchPostedList} from "../../redux/action/postedListActions";
import PostCard from "../views/PostCard";



class Post extends Component {
  constructor(props) {
    super(props);
    this.props.fetchPostedList(this.props.token, ()=>alert("failed to fetch post list!"));
  }

  render() {
    let postListViews = this.props.postedList.map(job => {
      return (
        <div>
          <PostCard job={job} token={this.props.token}
                   delete={this.props.deleteFromPostedList}
                   redirect={()=>this.props.history.push({pathname:"/updatejob", state:job})}
          /><br/>
        </div>
      )
    });

    console.log(this.props.token);
    return(

      <div className="mx-0 px-0">

        <GuestHeader/>
        <br/>
        <MDBContainer>
          <MDBRow>
            <MDBCol size={10}> </MDBCol>
            <MDBCol size={2}>
              <MDBLink to={'/postjob'}><MDBBtn gradient="aqua">New Job</MDBBtn></MDBLink>
            </MDBCol>
          </MDBRow>
          <div className="d-flex justify-content-center">
            <MDBRow>{postListViews}</MDBRow>
          </div>
        </MDBContainer>
        <Footer/>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch, props) {
    return {
        fetchPostedList: (token,errHandler)=> {dispatch(fetchPostedList(token, errHandler))},
        deleteFromPostedList:(token, job, errHandler)=>{dispatch(deleteFromPostedList(token, job, errHandler))}
    }
}



function mapStateToProps (state) {
  return {
    postedList: state.postedList,
    token: state.account.token,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);