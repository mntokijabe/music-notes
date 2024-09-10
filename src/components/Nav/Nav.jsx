import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

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
        {user.id && (
          <>
            <Button component={Link} to="/user" variant="contained">Search Library</Button>
            <Button component={Link} to="/addsong" variant="contained">Add Music</Button>
            <Button component={Link} to="/calendar" variant="contained">Calendar</Button>
            Welcome, {user.name}
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
