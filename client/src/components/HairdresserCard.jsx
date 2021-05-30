import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    card: {
        height: 250,
        width: 350,
        textAlign: 'left',
    },

}));

export default function HairdresserCard({hairdresser}) {
    const classes = useStyles();

    return (
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
    )
}