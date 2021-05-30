import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 25
    },
    card: {
        height: 250,
        width: 350,
        textAlign: 'left',
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
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {`${hairdresser.username} - ${hairdresser.firstName} ${hairdresser.lastName}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Email: {hairdresser.email}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Phone: {hairdresser.phone}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Location: {hairdresser.location}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Work hours: {hairdresser.workHours.start} - {hairdresser.workHours.to}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {hairdresser.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Book
                                    </Button>
                                </CardActions>
                            </Card>
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