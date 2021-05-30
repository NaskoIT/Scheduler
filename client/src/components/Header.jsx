import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Link from '@material-ui/core/Link';
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { preventDefault } from '../common/helper-functions';
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

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Link className={classes.link} to="/login">
                    Login
                </Link>
                <Link className={classes.link} to="/register">
                    Register
                </Link>
                <Link className={classes.link} to="/hairdressers">
                    Hairdressers
                </Link>
            </Toolbar>
        </AppBar>
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="container-fluid">
        //         <Link className="navbar-brand" to="/">Scheduler</Link>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarNav">
        //             <ul className="navbar-nav">
        //                 <li className="nav-item">
        //                     <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/login">Login</Link>
        //                 </li>
        //                 <li className="nav-item">
        //                     <Link className="nav-link" to="/register">Register</Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     </div>
        // </nav>
    )
}

export default Header;