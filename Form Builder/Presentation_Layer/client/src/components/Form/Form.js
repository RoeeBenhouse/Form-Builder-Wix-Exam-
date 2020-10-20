import React from 'react';
import FormField from './FormField/FormField'
import Button from '@material-ui/core/Button';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import classes_2 from './Form.css'


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

const form = props => {
  const classes = useStyles();

  return (
    <div className={classes_2.FormPreview}>

      <h1>{props.formsName}</h1>
      <p></p>
      {
        props.fields.map( f => (
          <FormField label={f.label} input={f.input} type={f.type}/>
        ))
      }
      <p></p>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          Submit form
        </Button>
      </ThemeProvider>
    </div>

  )
}

export default form;
