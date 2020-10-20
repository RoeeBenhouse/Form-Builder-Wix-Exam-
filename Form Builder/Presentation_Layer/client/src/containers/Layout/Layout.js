import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import { Route } from 'react-router-dom';
import FormBuilder from '../FormsBuilder/FormsBuilder'
import Home from '../../containers/Home/Home'
import FormsHistory from '../FormsHistory/FormsHistory'

const layout = () => (
    <div>
        <Toolbar/>
        <Route path="/" exact component={Home} />
        <Route path="/new-form" component={FormBuilder} />
        <Route path="/forms_list" component={FormsHistory} /> 
    </div>
);

export default layout;
