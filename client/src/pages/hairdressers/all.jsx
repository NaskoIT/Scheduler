import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import HairdresserCard from '../../components/HairdresserCard'

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
    const [hairdressers, setHairdressers] = useState(hairdressersData);
    const classes = useStyles();

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

const hairdressersData = [
    {
        "id": "1",
        "username": "naskoIT",
        "email": "nasko01_vasilev@abv.bg",
        "firstName": "Atanas",
        "lastName": "Vasilev",
        "location": "Studentski grad, street 2, blok 18",
        "phone": "0871234567",
        "workHours": {
            "start": "9:00",
            "end": "18:00"
        },
        "description": "some description about the hairdresser"
    },
    {
        "id": "2",
        "username": "naskoIT2",
        "email": "nasko0122_vasilev@abv.bg",
        "firstName": "Vasi",
        "lastName": "Andreev",
        "location": "Studentski grad, street 25, blok 18",
        "phone": "0871784567",
        "workHours": {
            "start": "10:00",
            "end": "20:00"
        },
        "description": "some description about the hairdresser about the second hairdresser"
    }
]