import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import {ThemeButton} from "../Button/ThemeButton.tsx";

const navItems = [
    { label: 'Gallery', to: '/gallery' },
    { label: 'Projects', to: '/projects' },
    { label: '3D-Models', to: '/3d' },
    { label: 'About Me', to: '/about-me' },
];

export default function Navbar() {
    return (
        <AppBar position="sticky" color="default" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Aaron Holenstein
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.to}
                            component={NavLink}
                            to={item.to}
                            sx={{
                                color: 'text.primary',
                                textTransform: 'none',
                                '&.active': {
                                    borderBottom: '2px solid',
                                    borderColor: 'primary.main',
                                },
                            }}
                        >
                            {item.label}
                        </Button>
                    ))} 
                    <ThemeButton/>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
