import React, { Component } from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Routes from './config/routes'
import Footer from './components/Footer/Footer'
import API_URL from './constants';

class App extends Component {
  state = {
    currentUser: localStorage.getItem('user'),
    showLogin: false,
    showSignup: false
  }

  setCurrentUser = (id, first_name=null, last_name=null) => {
    // If no id is passed, delete the session in local storage
    if (id === null) {
      localStorage.removeItem('user')
      return this.setState({ currentUser: localStorage.getItem('user') })
    }
    const user = {
      "id": id,
      "first_name": first_name,
      "last_name": last_name
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ 
      currentUser: localStorage.getItem('user'),
    })
  }

  handleLogout = () => {
    localStorage.removeItem('user');
    axios.get(`${API_URL}/logout`, 
      { withCredentials: true }
      )
      .then(() => {
        this.setState( {currentUser: null });
        this.props.history.push('/');
      })
  };

  handleShowLogin = () => {
    if (this.state.showLogin === false){
      return this.setState({ showLogin: true })
    } else {
      return this.setState({ showLogin: false })
    }
  }

  handleShowSignup = () => {
    if (this.state.showSignup === false){
      return this.setState({ showSignup: true })
    } else {
      return this.setState({ showSignup: false })
    }
  }

  render() {
    return (
      <>
        <Navigation currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} handleLogout={this.handleLogout} handleShowLogin={this.handleShowLogin} handleShowSignup={this.handleShowSignup} showLogin={this.state.showLogin} showSignup={this.state.showSignup}/>
        <Routes currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} handleShowLogin={this.handleShowLogin} handleShowSignup={this.handleShowSignup}  />
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
