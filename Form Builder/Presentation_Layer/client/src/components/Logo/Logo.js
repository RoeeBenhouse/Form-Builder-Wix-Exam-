import React from 'react';
import formsLogo from "../../assets/Images/form-logo.png";
import classes from './Logo.css';

const logo = () => (
    <div className={classes.Logo}>
        <img src={formsLogo} alt="formsss"/>
    </div>
);

export default logo;