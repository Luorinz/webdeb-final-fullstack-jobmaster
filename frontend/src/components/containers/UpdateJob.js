import React, { Component } from 'react';
import Footer from '../views/Footer';
import { MDBJumbotron,MDBBtn,MDBBadge} from "mdbreact";
import Header from "../views/Header";
import {connect} from "react-redux";
import { updatePostedList } from "../../redux/action/postedListActions";

class UpdateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:"",
      created:"2020-04-16T10:05:04.000+0000",
      description:"",
      redirect_url:"",
      company:{display_name:""},
      category:{label:""},
      location:{display_name:""},
      underReview:true
    }
  }
  render() {
    const job = this.props.location.state;
    return(
      <div className="mx-0 px-0">
        <Header/>
        <br/>

        <br/>
        <div className="d-flex justify-content-center">
          <MDBJumbotron>


            <form onSubmit={e=>e.preventDefault()}>
              <p className="h4 text-center mb-4"><MDBBadge color="near-moon-gradient">Edit Your Job</MDBBadge></p>
              <label htmlFor="defaultFormTitle" className="grey-text">
                Job Title:
              </label>
              <input type="text" id="defaultFormTitle" className="form-control"
                     onChange={e=>this.setState({title: e.target.value})}/>
              <br />
              <label htmlFor="defaultFormTitle" className="grey-text">
                {/* Date Created:
                        </label>
                        <input type="text" id="defaultFormCreated" className="form-control"
                          onChange={e=>this.setState({created: e.target.value})}/>
                        <br />
                        <label htmlFor="defaultFormCreated" className="grey-text"> */}
                Job Description:
              </label>
              <textarea type="text" id="defaultFormDescription" className="form-control"
                        onChange={e=>this.setState({description: e.target.value})}/>
              <br />
              <label htmlFor="defaultFormUrl" className="grey-text">
                Job URL:
              </label>
              <textarea type="text" id="defaultFormUrl" className="form-control"
                        onChange={e=>this.setState({redirect_url: e.target.value})}/>
              <br />
              <label htmlFor="defaultFormCompany" className="grey-text">
                Company:
              </label>
              <input type="text" id="defaultFormCompany" className="form-control"
                     onChange={e=>this.setState({company:{display_name: e.target.value} })}/>
              <br />
              <label htmlFor="defaultFormCatagory" className="grey-text">
                Category:
              </label>
              <input type="text" id="defaultFormCatagory" className="form-control"
                     onChange={e=>this.setState({category: {label: e.target.value} })}/>
              <br />
              <label htmlFor="defaultFormCatagory" className="grey-text">
                Location:
              </label>
              <input type="text" id="defaultFormCatagory" className="form-control"
                     onChange={e=> this.setState({location: {display_name: e.target.value}})}/>
              <br />


              <div className="text-center mt-4">
                <MDBBtn color="info" outline type="submit"
                        onClick={async ()=>{
                          const newJob = Object.assign({}, job, this.state);
                          await this.props.updateJob(this.props.token, newJob, ()=>alert("failed to update a job!"))
                          this.props.history.push('/post');
                        }}>
                  Post
                </MDBBtn>
              </div>
            </form>

          </MDBJumbotron>
        </div>
        <Footer/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    token: (!state.account) ? "" : state.account.token,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    updateJob:(token, job, errHandler)=> dispatch(updatePostedList(token, job, errHandler))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UpdateJob);