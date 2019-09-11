import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Landing from '../components/Landing/Landing'
import Home from '../components/Home/Home';
import Specify from '../components/Specify/Specify';
import NotFound from './NotFound/NotFound';



const Routes = ({ currentUser, setCurrentUser, showLogin, showSignup, handleShowLogin, handleShowSignup }) => {

    // const PrivateRoute = ({ component: Component, ...rest }) => {
    //     return <Route {...rest} render={(props) => (
    //         currentUser
    //         ? <Component {...props} currentUser={currentUser}  />
    //         : <Redirect to='/' />
    //     )} />
    // };

    return (
        <Switch>
            <Route exact path='/' render={() => <Landing currentUser={currentUser} setCurrentUser={setCurrentUser} showLogin={showLogin} showSignup={showSignup} handleShowLogin={handleShowLogin} handleShowSignup={handleShowSignup} />} />
            <Route exact path='/home' render={() => <Home currentUser={currentUser} setCurrentUser={setCurrentUser} showLogin={showLogin} showSignup={showSignup} handleShowLogin={handleShowLogin} handleShowSignup={handleShowSignup} />} />
            {/* <PrivateRoute exact path='/home' component={ Home } /> */}
            <Route exact path='/specify' render={() => <Specify currentUser={currentUser} setCurrentUser={setCurrentUser} showLogin={showLogin} showSignup={showSignup} handleShowLogin={handleShowLogin} handleShowSignup={handleShowSignup} />} />
            <Route path='*' component={NotFound} />
        </Switch>
    );
};

export default withRouter(Routes);