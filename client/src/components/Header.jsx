import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { userIsLoggedIn } from '../services/appStateService';
import { appRoutes } from '../constants/routes';
import './Header.css'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        link: {
            color: theme.palette.common.white,
            marginRight: theme.spacing(2),
            fontSize: 18,
            '&:hover': {
                color: '#dbdce2'
            },
            textDecoration: 'none'
        },
    }
});

function Header(props) {
    const classes = useStyles();
    const isLoggedIn = userIsLoggedIn();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                { !isLoggedIn &&
                    <>
                        <Link className={classes.link} to={appRoutes.hairdressers.all}>
                            Hairdressers
                        </Link>
                        <Link className={classes.link} to={appRoutes.hairdressers.calendar}>
                            Calendar
                        </Link>
                    </>
                }
                {
                    !isLoggedIn &&
                    <>
                        <Link className={classes.link} to={appRoutes.login}>
                            Login
                        </Link>
                        <Link className={classes.link} to={appRoutes.hairdressers.register}>
                            Register
                        </Link>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;