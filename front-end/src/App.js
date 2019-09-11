import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Routes from './config/routes'
import Footer from './components/Footer/Footer'


class App extends Component {
  state = {
    currentUser: JSON.parse(localStorage.getItem('user')),
    showLogin: false,
    showSignup: false
  }

  setCurrentUser = (id, first_name, last_name) => {
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
    localStorage.removeItem('uid');
    return
  //   axios.post(`${API_URL}/auth/logout`, { withCredentials: true })
  //     .then(() => {
  //       this.setState( {currentUser: null });
  //       this.props.history.push('/');
  //     })
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
        <Navigation currentUser={this.state.currentUser} handleLogout={this.handleLogout} handleShowLogin={this.handleShowLogin} handleShowSignup={this.handleShowSignup} />
        <Routes currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} handleShowLogin={this.handleShowLogin} handleShowSignup={this.handleShowSignup} showLogin={this.state.showLogin} showSignup={this.state.showSignup} />
        <Footer />
      </>
    );
  }
}

export default App;
