import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);
  console.log('user values are ', user)
  return (
    <Box className="nav" >
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {(user.id && user.admin == false) && (
          <>
            <Button component={Link} to="/user" variant="contained">Search Library</Button>

            <Button component={Link} to="/calendar" variant="contained">Calendar</Button>
            <h3>Welcome, {user.username}</h3>
            <LogOutButton className="navLink" />
          </>
        )}
        {(user.id && user.admin==true) && (
          <>
            <Button component={Link} to="/user" variant="contained">Search Library</Button>
            <Button component={Link} to="/addsong" variant="contained">Add Music</Button>
            <Button component={Link} to="/calendar" variant="contained">Calendar</Button>
            <h3>Welcome, {user.username}</h3>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
    </Box>
  );
}

export default Nav;
