import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Landing from '../components/Landing/Landing'
import Home from '../components/Home/Home';
import NotFound from './NotFound/NotFound';



const Routes = ({ currentUser, setCurrentUser, showLogin, showSignup, handleShowLogin, handleShowSignup }) => {

    const PrivateRoute = ({ component: Component, ...rest }) => {
        return <Route {...rest} render={(props) => (
            currentUser
            ? <Component {...props} currentUser={currentUser}  />
            : <Redirect to='/' />
        )} />
    };

    return (
        <Switch>
            <Route exact path='/' render={(props) => <Landing {...props} currentUser={currentUser} setCurrentUser={setCurrentUser} showLogin={showLogin} showSignup={showSignup} handleShowLogin={handleShowLogin} handleShowSignup={handleShowSignup} />} />
            <PrivateRoute exact path='/home' component={ Home } />
            <Route path='*' component={NotFound} />
        </Switch>
    );
};

export default withRouter(Routes);