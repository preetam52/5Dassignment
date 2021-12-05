import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Route, Switch, Redirect } from 'react-router-dom';
import MomentList from './Moments/momentList';
import AddMoments from './Moments/addMoments';


const homeRoutes = [
    // {path: "/", redirectTo: "/auth/signup"},
    {path: "/moments", component: MomentList, label: 'Moment List'},
    {path: "/addMoment", component: AddMoments, label: 'Add new moment'},
    {path:'/home', redirectTo: sessionStorage.getItem('userId') ? '/home/moments' : '/auth'},

]
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {console.log(props)}
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton

                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>

                </DrawerHeader>
                <List>
                    {
                        <ListItem >
                            <ListItemText primary={'Profile'} />
                        </ListItem>
                    }
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{background:'#001b31'}}
                        >
                            <Typography style={{color: 'white'}}>Moments</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        {homeRoutes.filter(e => e.label).map((e,i) => 
                        <ListItem onClick={() => props.history.push('/home'+e.path)} style={{cursor: 'pointer'}} >
                            {<span style={{height: 8, width: 8, background: props.location.pathname === `/home${e.path}` ? '#001b31' : 'white', borderRadius: 100, marginRight: 15}}></span>}
                            <ListItemText primary={e.label} />
                        </ListItem>
                        )}
                        </AccordionDetails>
                    </Accordion>
                </List>

            </Drawer>
            <Main open={open}>
                <DrawerHeader />

                <Switch>
                {
                    homeRoutes.map((route,i) => route.redirectTo ? <Redirect key={route.path} to={route.redirectTo}/> : <Route exact key={route.path} path={`${props.match.path}${route.path}`} component={route.component} />)
      
                }
                </Switch>
            </Main>
        </Box>
    );
}
