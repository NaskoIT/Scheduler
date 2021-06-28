import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    alternativeText: {
        textAlign: 'center',
        fontSize: '18px'
    }
}));

export default function AlternativePageContent(props) {
    const classes = useStyles();

    return (
        <p className={classes.alternativeText}>{props.content}</p>
    )
}