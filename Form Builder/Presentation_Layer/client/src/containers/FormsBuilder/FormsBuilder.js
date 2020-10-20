import React, { Component } from 'react';
import classes from './FormsBuilder.css'
import { makeStyles } from '@material-ui/core/styles';
import Form from '../../components/Form/Form'


class FormsBuilder extends Component {
    state = {
        forms_name: '',
        field_label: '',
        field_input: '',
        field_type: '',
        forms: '',
        fields: [],
        response: '',
        post: '',
        post_form_name: '',
        responseToPost: '', 
        response_name: '', 
        viewForm: ''
    };

    componentDidMount() {
        this.callApi()                                                   //get back the Promise from callApi
          .then(res => this.setState({ forms: res }))         //update the state app response field according to res.express
          .catch(err => console.log(err));                               //else print an error msg
    }
    
    callApi = async () => {
        const response = await fetch('/api/get-data');                     //because of the proxy we added to the package.json file we dont need to add full url
                                                                        //await <promise or any value to wait for> --> waiting for the fetch function to give back response
                                                                        //fetch (GET): takes one argument — the path to the resource you want to fetch — and returns a promise containing the response
        const body = await response.json();                             //json(): extract the JSON body content from the response
        if (response.status !== 200) throw Error(body.message);
        return body;                                                    //if the fetch completed succesfully, body is a Promise
    };

    submitFormHandler = async e => {
        e.preventDefault();                                              //prevent the native submmition that expected from react
        const response = await fetch('/api/insert', {                    //fetch(resource, init = An object containing any custom settings that you want to apply to the request.)
        method: 'POST',                                                    //Returns a Promise that resolves to a Response object.
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            formsName: this.state.forms_name, 
            fields: this.state.fields, 
            submit_quantity: 0, 
            sumbit_link : '',
            sumbited_link: ''
        })
        });
        const body = await response.json();
        this.setState({ 
                forms: body, 
                viewForm: <Form formsName={this.state.forms_name} fields={this.state.fields}/>
            });
        
    }

    addNewFieldHandler = () => {
        let label = this.state.field_label;
        let input = this.state.field_input;
        let type = this.state.field_type;
        if(type === 'text' || type === 'color' || type === 'date' || type === 'email' || type === 'tel' || type === 'number') {
            let newField = {
                label: label,
                input: input,
                type: type
            }

            let fields = this.state.fields.concat(newField);
            this.setState({ responseToPost: 'field added succefully!', fields: fields});        
        } else {
            alert("illegal type!!!");
            this.emptyFields();
        }
    }

    emptyFields = () => {
        this.setState({ field_label: '',
                        field_input: '',
                        field_type: '',
                        responseToPost: ''})
    }

    handleSubmitNewFormName = async e => {
        let name = this.state.forms_name;
        let forms = this.state.forms;
        let valid = "valid";
        forms.forEach(f => f.formsName===name ? valid="invalid" : valid);
        console.log("enter handleSubmitNewFormName------>" + valid);
        alert(valid);
        this.setState({ forms_name:name });
    };

    useStyles = () => makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
    }));
   
    classes = this.useStyles();
     
    render () {
        return (
            <div>
                <div className={classes.Header}>
                    <h2>Forms Builder Page</h2>
                </div>

                <form className="w3-container">
                    <label className="w3-text-teal"><b>Form's name: </b></label>
                    <input  className={classes.InputFormName} 
                        type="text"
                        value={this.state.forms_name}
                        onChange={e => this.setState({ forms_name: e.target.value })}>
                    </input>

                    {/* <button 
                        className="w3-btn w3-blue-grey"
                        onClick={this.handleSubmitNewFormName}>
                        Check valid Name
                    </button> */}
                </form>

                <div className="w3-container w3-teal">
                    <h2>Fields</h2>
                </div>
                <p>Insert label, input, and type (text, color, date, email, tel, number).</p>

                <form className="w3-container">
                    <label className="w3-text-teal"><b>Label:</b></label>
                    <input 
                        className="w3-input w3-border w3-light-grey w3-hover-green" 
                        type="text"
                        value={this.state.field_label}
                        onChange={e => this.setState({ field_label: e.target.value })}> 
                    </input>
                </form>

                <form className="w3-container">
                    <label className="w3-text-teal"><b>Input:</b></label>
                    <input 
                        className="w3-input w3-border w3-light-grey w3-hover-green" 
                        type="text"
                        value={this.state.field_input}
                        onChange={e => {
                            this.setState({ field_input: e.target.value })
                        }}>  
                    </input>
                </form>

                <form className="w3-container">
                    <label className="w3-text-teal"><b>Type:.</b></label>
                    <input 
                        className="w3-input w3-border w3-light-grey " 
                        type="text"
                        value={this.state.field_type}
                        onChange={e => {
                            this.setState({ field_type: e.target.value });
                        }}> 
                    </input>
                </form>
                <p></p>

                <button 
                    className="w3-btn w3-blue-grey"
                    onClick={this.addNewFieldHandler}>
                    Add new field     
                </button>

                <button 
                    className="w3-btn w3-blue-grey"
                    onClick={this.emptyFields}>
                    empty to enter new field     
                </button>
                <p>
                    {this.state.responseToPost}
                </p>

                <button 
                    className={classes.Button}
                    onClick={this.submitFormHandler}>
                    <strong>Save Form</strong>
                </button>
                <p>form's preview: </p>
                {this.state.viewForm}

            </div>
        )
    }
}

export default FormsBuilder;

 