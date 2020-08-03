import React, { Component } from 'react';
import Home from '../screens/home/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from '../screens/login/Login';
import Profile from '../screens/profile/Profile';

//Controller class for implementing Routing functionality

class Controller extends Component {

  constructor() {
    super();
    //This is the base url of the API end points
    this.baseUrl = "https://graph.instagram.com/";
  }

  render() {
    return (
      <Router>
        <div className="main-container">
           <Route exact path='/' render={(props) => <Login {...props} baseUrl={this.baseUrl}/>} />
           <Route exact path='/home' render={(props) => <Home {...props} baseUrl={this.baseUrl} />}/>
            <Route exact path='/profile' render={(props) => <Profile {...props} baseUrl={this.baseUrl} />}/>
          {/*  />
          <Route path='/bookshow/:id' render={(props) => <BookShow {...props} baseUrl={this.baseUrl} />} />
          <Route path='/confirm/:id' render={(props) => <Confirmation {...props} baseUrl={this.baseUrl} />} /> */}
        </div>
      </Router>
    )
  }
}

export default Controller;