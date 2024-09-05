import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
    >
      <List  sx={{mt:'8rem'}}>
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
    </Drawer>
  );
}

export default Sidebar;
