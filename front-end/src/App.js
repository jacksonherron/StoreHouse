import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Routes from './config/routes'
import Footer from './components/Footer/Footer'


class App extends Component {
  state = {
    showLogin: false,
    showSignup: false
  }

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
        <Navigation handleShowLogin={this.handleShowLogin} handleShowSignup={this.handleShowSignup} />
        <Routes handleShowLogin={this.handleShowLogin} handleShowSignup={this.handleShowSignup} showLogin={this.state.showLogin} showSignup={this.state.showSignup} />
        <Footer />
      </>
    );
  }
}

export default App;
