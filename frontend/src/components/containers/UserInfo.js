import React, { Component } from 'react';
import Footer from '../views/Footer';
import {MDBJumbotron, MDBBtn, MDBBadge, MDBLink} from "mdbreact";
import Header from "../views/Header";
import Axios from "axios";
import {logout} from "../../redux/action/accountActions";
import {connect} from "react-redux";
import {HEROKU_PATH} from "../../rootPath";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phonenumber:"",
      thumbnail:"",
      description:""
    }
  }
  update = (event, token, info)=> {
    Axios.put(`${HEROKU_PATH}/user/update/role?username=${this.state.username}&role=${this.state.role}`,
      info, {headers: {Authorization: `Bearer ${token}`}})
      .then(response=>
        {
          this.props.logout(token);
          alert("please login again after update your role");
        },
        error=> {
          alert("update role error");
          event.preventDefault();
        }
      )
  }

    render() {

        return(
            <div className="mx-0 px-0">
                <Header/>
                <br/>
              
                <br/>
                <div className="d-flex justify-content-center">
                  <MDBJumbotron> 
                  
  
                    <form onSubmit={e=>e.preventDefault()}>
                        <p className="h4 text-center mb-4"><MDBBadge color="near-moon-gradient">Account Information</MDBBadge></p>
                        <label htmlFor="defaultFormContactPhoneNumEx" className="grey-text">
                        New Phone Number
                        </label>
                        <input type="text" id="defaultFormContactPhoneNumEx" className="form-control"
                          onChange={e=>this.setState({phonenumber: e.target.value})}/>
                        <br />
                        <label htmlFor="defaultFormContactThumbnailEx" className="grey-text">
                        New Thumbnail
                        </label>
                        <input type="text" id="defaultFormThumbnailEmailEx" className="form-control"
                          onChange={e=>this.setState({thumbnail: e.target.value})}/>
                        <br />
                        <label htmlFor="defaultFormContactDescriptionEx" className="grey-text">
                        New Description
                        </label>
                        <input type="text" id="defaultFormContactDescriptionEx" className="form-control"
                          onChange={e=>this.setState({description: e.target.value})}/>
                        <br />
                        
                        <div className="text-center mt-4">
                          <MDBLink to={"/"}>
                                <MDBBtn color="info" outline type="submit"
                                onClick={(e)=>this.update(e, this.props.token, this.state)}>
                                    Update
                                </MDBBtn>
                          </MDBLink>
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
    logout:(token)=> dispatch(logout(token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfo);