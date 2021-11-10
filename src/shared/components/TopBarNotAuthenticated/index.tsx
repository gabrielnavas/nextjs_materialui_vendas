import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const TopBarNotAuthenticated = () =>(
  <AppBar position="static">
  <Toolbar>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      System LTDA
    </Typography>
  </Toolbar>
  </AppBar>
) 

export default TopBarNotAuthenticated