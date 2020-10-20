import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(id, name, subNum, subLink, subs) {
  return { id, name, subNum, subLink, subs };
}


function getForms(forms) {
    let rows = [];
    let id = 0;
    forms.forEach(f => {
        id = id + 1;
        return rows.push(createData(id, f.formsName, 0, "submit_link", "sumbited link"))
      }  
    );
    return rows;
}



export default function SimpleTable(props) {
  const classes = useStyles();
  const rows = getForms(props.forms);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Form Id</TableCell>
            <TableCell>Form name</TableCell>
            <TableCell># Submissions</TableCell>
            <TableCell>Submit Page</TableCell>
            <TableCell>Submissions Page</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.subNum}</TableCell>
              <TableCell>{row.subLink}</TableCell>
              <TableCell>{row.subs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}