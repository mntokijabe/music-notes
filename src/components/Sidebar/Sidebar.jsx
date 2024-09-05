import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

function Sidebar() {

    
  return (
    <Box
      variant="permanent"
      sx={{width: 180, flexShrink: 0, marginLeft:-3, marginRight:2, '& .MuiBox-paper': { width: 1800, boxSizing: 'border-box' }, bgcolor:'lightgray'}}
    >
    
      <List  sx={{mt:'12rem'}}>
        <ListItem button>
          <ListItemText primary="Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Item 3" />
        </ListItem>
      </List>
    </Box>
  );
}

export default Sidebar;
