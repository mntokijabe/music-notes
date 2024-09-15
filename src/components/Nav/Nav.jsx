import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';


function Nav() {
  const user = useSelector((store) => store.user);
  return (
    <Box  className="nav" sx={{display:'flex', flexDirection:'row', flexGrow:1, justifyContent:'space-between'}}>
      {/* left side  Box 1*/}
      <Box sx={{flexGrow:1}}>
        <IconButton size='large' color='inherit'> <LibraryMusicIcon /> </IconButton>
        <Link className="navLink" to="/about">
          About
        </Link>   
      </Box>


    {/* center  Box 2 */}
      
         {/* If a user is logged in, show these links */}
        {(user.id && user.admin == false) && 
        <Box sx={{display:'flex', flexDirection:'row', flexGrow:3, justifyContent:'flex-end', gap:8}}>
          <Button component={Link} to="/user" variant="contained">Search Library</Button>
          <Button component={Link} to="/calendar" variant="contained">Calendar</Button>
        </Box>
        }
        {(user.id && user.admin==true) && (
          <Box sx={{display:'flex', flexDirection:'row', flexGrow:3, justifyContent:'flex-end', gap:2}}>
            <Button component={Link} to="/user" variant="contained">Search Library</Button>
            <Button component={Link} to="/addsong" variant="contained">Add Music</Button>
            <Button component={Link} to="/calendar" variant="contained">Calendar</Button>
          </Box>
        )}
   


      {/* Right side Box 3 */}
      <Box sx={{display:'flex', flexDirection:'row', flexGrow:3, justifyContent:'flex-end', gap:2}}>
        {/* If no user is logged in, show these links */} 
        {!user.id && 
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }
         {/* If a user is logged in, show these links */}
        {(user.id && user.admin == false) && (
          <>
            <h2 style={{padding:'10px', color:'#232323'}}>Welcome, {user.username}</h2>
            <LogOutButton className="navLink" />
          </>
        )}
        {(user.id && user.admin==true) && (
          <>
            <h2 style={{padding:'10px', color:'#232323'}}>Welcome, {user.username} </h2>
            <h4 style={{padding:'13px', color:'#4a4a4a' }}>(Admin)</h4>
            <LogOutButton className="navLink" />
          </>
        )}
      </Box>
    
    </Box>
  );
}

export default Nav;


{/* <Box sx={{justifyContent:'flex-end', gap:8}}>

        


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
    <h3>Welcome, {user.username} </h3><h5>Admin</h5>
    <LogOutButton className="navLink" />
  </>
)}


</Box> */}