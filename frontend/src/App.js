import React from 'react';
import './App.css';

import UserLogin from './components/containers/UserLogin';
import Register from './components/containers/Register';
import Home from './components/containers/Home';
import Search from './components/containers/Search';
import Profile from './components/containers/Profile';
import Save from './components/containers/Save';
import Post from './components/containers/Post';
import Review from './components/containers/Review';
import{BrowserRouter,Route,Switch} from 'react-router-dom'
import{MDBContainer} from 'mdbreact'
import UserInfo from './components/containers/UserInfo';
import PostJob from "./components/containers/PostJob";
import UpdateJob from "./components/containers/UpdateJob";



function App() {
  return (
      <div className="App">
        <MDBContainer className={'m-0 p-0'} style={{ height: '100vh' }} fluid>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Search}/>
                    <Route path='/home/:keyword' component={Home}/>
                    <Route path='/userlogin' component={UserLogin}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path='/userinfo' component={UserInfo}/>
                    <Route path='/save' component={Save}/>
                    <Route path='/post' component={Post}/>
                    <Route path='/review' component={Review}/>
                    <Route path='/postjob' component={PostJob}/>
                    <Route path='/updatejob' component={UpdateJob}/>
                </Switch>
            </BrowserRouter>
        </MDBContainer>
    </div>
  );
}

export default App;
