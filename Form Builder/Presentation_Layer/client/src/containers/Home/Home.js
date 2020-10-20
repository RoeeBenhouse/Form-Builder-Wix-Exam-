import React, { Component } from 'react';
import Logo from '../../components/Logo/Logo'
import classes from '../Home/Home.css'

class home extends Component {
    render () {
        return (
            <div className={classes.Logo}>
                <Logo/>
                <h1>Welcome to your own form's assistent!</h1>
                <p1>Create new forms costumized for you </p1>
                <p1>and manage your old forms.</p1>
                <h1>If you love us, tell your friends!</h1>
            </div>
        )
    }
};

export default home;
