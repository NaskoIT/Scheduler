import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {
    return {
        greeting: {
            fontSize: 18,
            marginRight: theme.spacing(2)
        }
    }
});

export default function UserGreeting(props) {
    const classes = useStyles();

    return (
        <span className={classes.greeting}>Hello, {props.username}</span>
    )
}