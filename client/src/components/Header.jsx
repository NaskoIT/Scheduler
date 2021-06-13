import React from 'react'
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { appRoutes } from '../constants/routes';
import './Header.css'
import AppContext from '../contexts/appContext';
import { clearUserState } from '../services/localStorageService';
import UserGreeting from './UserGreeting';

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
    const [appState, setAppState] = React.useContext(AppContext);
    const isLoggedIn = appState.isLoggedIn;
    const history = useHistory();

    const onLogout = () => {
        clearUserState();
        setAppState(state => ({ ...state, isLoggedIn: false, username: '', id: undefined }));
        history.push(appRoutes.login);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                { 
                    isLoggedIn &&
                    <>
                        <UserGreeting username={appState.username} />
                        <Link className={classes.link} to={appRoutes.hairdressers.all}>
                            Hairdressers
                        </Link>
                        <Link className={classes.link} to={appRoutes.hairdressers.calendar}>
                            Calendar
                        </Link>
                        <Link className={classes.link} onClick={onLogout}>
                            Logout
                        </Link>
                    </>
                }
                {
                    !isLoggedIn &&
                    <>
                        <Link className={classes.link} to={appRoutes.login}>
                            Login
                        </Link>
                        <Link className={classes.link} to={appRoutes.register}>
                            Register
                        </Link>
                    </>
                }
            </Toolbar>
        </AppBar>
    )
}

export default Header;