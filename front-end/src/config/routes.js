import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Landing from '../components/Landing/Landing'
import Home from '../components/Home/Home';
import Specify from '../components/Specify/Specify';
import NotFound from './NotFound/NotFound';



const Routes = ({ currentUser, setCurrentUser, showLogin, showSignup, handleShowLogin, handleShowSignup }) => {

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return <Route {...rest} render={(props) => (
            currentUser
            ? <Component {...props} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            : <Redirect to='/' />
        )} />
    };

    return (
        <Switch>
            <Route exact path='/' render={() => <Landing currentUser={currentUser} setCurrentUser={setCurrentUser} showLogin={showLogin} showSignup={showSignup} handleShowLogin={handleShowLogin} handleShowSignup={handleShowSignup} />} />
            <PrivateRoute exact path='/home' component={ Home } currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <PrivateRoute exact path='/specify' component={ Specify } currentUser={currentUser} />
            <Route path='*' component={NotFound} />
        </Switch>
    );
};

export default withRouter(Routes);