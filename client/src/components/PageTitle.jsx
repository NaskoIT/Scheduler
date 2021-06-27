import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'center',
        marginTop: theme.spacing(2)
    }
}));

export default function PageTitle(props) {
    const classes = useStyles();

    return (
        <h2 className={classes.title}>{props.content}</h2>
    )
}