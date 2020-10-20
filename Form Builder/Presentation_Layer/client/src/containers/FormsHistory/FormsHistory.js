import React, { Component } from 'react';
import SimpleTable from '../FormsHistory/FormTable/FormTable'

class formsHistory extends Component {
    state = {
        forms: [],
        response: '',
    };

    componentDidMount() {
        this.callApi()                                                   
          .then(res => this.setState({ forms: res }))         
          .catch(err => console.log(err));                               
    }
    
    callApi = async () => {
        const response = await fetch('/api/get-data');                     
        const body = await response.json();                             
        if (response.status !== 200) throw Error(body.message);
        return body;                                                    
    };

    render () {
        return (
            <div>
                <h1>My Forms</h1>
                <SimpleTable forms={this.state.forms}/>
            </div>
        )
    }
};

export default formsHistory;
