import React from 'react';
import classes from './Toolbar.css'
import { Link } from 'react-router-dom';

const toolbar = () => (
    <div> 
        <div>
            <header className={classes.Form}>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/new-form">New Form</Link></li>
                        <li><Link to="/forms_list">My Forms</Link></li>
                    </ul>
                </nav>
            </header>
        </div> 
    </div>
);

export default toolbar;