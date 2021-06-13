import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HairdresserCard from '../../components/HairdresserCard'
import { getHairdressers } from '../../services/hairdressersService';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export default function Hairdressers() {
    const [hairdressers, setHairdressers] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getHairdressers()
            .then(response => {
                setHairdressers(response.hairdressers)
            });
    }, []);

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                    {hairdressers.map(hairdresser => (
                        <Grid key={hairdresser.id} item>
                            <HairdresserCard hairdresser={hairdresser} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}