import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button, Drawer,
    Divider,
    List, ListItem, ListItemButton, IconButton,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import {NavLink} from 'react-router-dom';
import {ThemeButton} from "../Button/ThemeButton.tsx";
import './Navbar.scss';
import useMediaQuery from "@mui/material/useMediaQuery";
import {createAppTheme, useTheme} from "../../theme/theme.ts";
import MenuIcon from '@mui/icons-material/Menu';
import {CSSProperties, useState} from "react";

const navItems = [
    {label: 'Gallery', to: '/gallery'},
    {label: 'Projects', to: '/projects'},
    {label: '3D-Models', to: '/models'},
    {label: 'About Me', to: '/about-me'},
];

export default function Navbar() {
    const {theme: currentTheme} = useTheme();
    const muiTheme = createAppTheme(currentTheme);
    const isMdUp = useMediaQuery(muiTheme.breakpoints.up('md')); // true if ≥900px

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    /**
     * Drawer that is shown on the left side of the screen
     */
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                MUI
            </Typography>
            <Divider/>
            <List className={`nav-drawer-list ${mobileOpen ? 'open' : ''}`}>
                {navItems.map((item, index) => (
                    <ListItem key={item.label} disablePadding style={{ '--delay': `${(index) * 0.1}s` } as CSSProperties}>
                        <ListItemButton
                            sx={{textAlign: 'center'}}
                            component={NavLink}
                            data-nav="true"
                            to={item.to}>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const topNavButtons = (
        <Box sx={{display: 'flex', gap: 2}}>
            {navItems.map((item) => (
                <Button
                    key={item.to}
                    component={NavLink}
                    data-nav="true"
                    to={item.to}
                    className="nav-button hover-underline"
                    sx={{
                        display: isMdUp ? 'flex' : 'none',
                    }}
                >
                    {item.label}
                </Button>
            ))}
            <ThemeButton/>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            {/*Normal Navbar*/}
            <AppBar
                position="sticky"
                color="default"
                elevation={1}
                component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: isMdUp ? 'none' : 'flex'}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        Aaron Holenstein
                    </Typography>
                    {/*Top Nav Buttons*/}
                    {topNavButtons}
                </Toolbar>
            </AppBar>
            {/*This is the part that opens up on the side*/}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                className="nav-drawer"
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: isMdUp ? 'none' : 'flex'
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}
