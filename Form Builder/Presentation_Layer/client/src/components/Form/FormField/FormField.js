import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import 'date-fns';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const FormField = (props) => {
    const classes = useStyles();
    const type = "field type: " + props.type;
    
    return (
                    <div className={classes.root}>
                        <TextField
                            id="outlined-full-width"
                            label={props.label}
                            style={{ margin: 8 }}
                            placeholder={props.input}
                            helperText={type}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        /> 
                    </div>
                );
        };

    export default FormField;

    // switch (props.type) {
    //     case('text'):
    //         return (
    //             <div className={classes.root}>
    //                 <TextField
    //                     id="outlined-full-width"
    //                     label={props.label}
    //                     style={{ margin: 8 }}
    //                     placeholder={props.input}
    //                     helperText="field type: text"
    //                     fullWidth
    //                     margin="normal"
    //                     InputLabelProps={{
    //                         shrink: true,
    //                     }}
    //                     variant="outlined"
    //                 /> 
    //             </div>
    //         );
    //         break;
    //     case('color'):
    //         return (
    //             <div className={classes.root}> 
    //                 <TextField
    //                     label="None"
    //                     id="outlined-margin-none"
    //                     defaultValue="Default Value"
    //                     className={classes.textField}
    //                     helperText="Some important text"
    //                     variant="outlined"
    //                 />
    //             </div>
    //         );
    //         break;
    //     case('date'):
    //         return (<div>
    //                     <KeyboardDatePicker
    //                         disableToolbar
    //                         variant="inline"
    //                         format="MM/dd/yyyy"
    //                         margin="normal"
    //                         id="date-picker-inline"
    //                         label={props.label}
    //                         value={selectedDate}
    //                         onChange={handleDateChange}
    //                         KeyboardButtonProps={{
    //                             'aria-label': 'change date',
    //                         }}
    //                 />
    //             </div>);
    //         break;
    //     case('email'):
    //         return (<div></div>);
    //         break;
    //     case('tel'):
    //         return (<div></div>);
    //         break;
    //     case('number'):
    //         return (<div></div>);
    //         break;
    //     default:
    //         return <div>Error: illegal type!</div>
//     }
// };

//FormField.PropTypes = {
    //     type: PropTypes.string.isRequired
    // };