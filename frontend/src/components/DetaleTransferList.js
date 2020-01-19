import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    list: {
		position: "relative",
		overflowY: "scroll",
		maxHeight: 200,
		minHeight: 200,
	}
}));

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}
  
function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

function notById(a, b, id_name) {
	b = b.map(value => value[id_name]);
	return a.filter(value => b.indexOf(value[id_name]) === -1);
}

function DetaleTransferList(props) {
    const classes = useStyles();
    const { id_name, name, wszystkieDetale, zaznaczoneDetale, handleChange } = props;

    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([]);

    useEffect(() => {
		const niezaznaczoneDetale = notById(wszystkieDetale, zaznaczoneDetale, id_name);
		setLeft(niezaznaczoneDetale);
		setRight(zaznaczoneDetale);
    }, [])

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    
    const customList = items => (
        <Paper className={classes.paper}>
          <List dense className={classes.list}>
            { items.map(value => {
              const labelId = `transfer-list-item-${value[id_name]}-label`;
    
              return (
                <ListItem key={value[id_name]} role="listitem" button onClick={handleToggle(value)}>
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value[name]}`} />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
          <Grid item>{customList(left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
          </Grid>
          <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}

export default DetaleTransferList;