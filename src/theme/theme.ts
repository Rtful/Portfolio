// src/theme/theme.ts
import {createTheme} from '@mui/material/styles';
import themes from './palette';
import React, {createContext, useContext} from 'react';

// Create theme context
export const ThemeContext = createContext({
    theme: '',
    setTheme: (() => {
    }) as React.Dispatch<React.SetStateAction<string>>,
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Function to create a Material-UI theme based on the current theme (light/dark)
export const createAppTheme = (currentTheme: string) => {
    const themeColors = themes[currentTheme as keyof typeof themes] || themes.light;

    return createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        '&[data-nav="true"]': {
                            color: themeColors.secondaryTextColor,
                            textTransform: 'none',
                        },
                        '&[data-nav="true"].active::after': {
                            transform: 'scaleX(1)'
                        },
                        '&:hover' : {
                            backgroundColor: 'unset',
                        },
                        '&:hover::after': {
                            transform: 'scaleX(1)'
                        },
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '100%',
                            height: '2px',
                            background: themeColors.backgroundColor,
                            bottom: 0,
                            left: 0,
                            transform: 'scaleX(0)',
                            transformOrigin: 'right',
                            transition: 'transform 0.4s ease-out'
                        },
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        '&[data-nav="true"]': {
                            color: themeColors.secondaryTextColor,
                            textTransform: 'none',
                        },
                        '&[data-nav="true"].active': {
                            borderColor: themeColors.secondaryColor,
                            backgroundColor: '#20243a70',
                        },
                    },
                },
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: themeColors.secondaryColor,
                        color: themeColors.secondaryTextColor,
                        boxSizing: 'border-box',
                        width: '240px',
                    }
                }
            },
            MuiToolbar: {
                styleOverrides: {
                    root: {
                        height: '4rem',
                        backgroundColor: themeColors.secondaryColor,
                        color: themeColors.secondaryTextColor,
                    }
                }
            },
        },
        palette: {
            primary: {
                main: themeColors.primaryColor,
            },
            secondary: {
                main: themeColors.secondaryColor,
            },
            background: {
                default: themeColors.backgroundColor,
            },
            text: {
                primary: themeColors.textColor,
                secondary: themeColors.secondaryTextColor,
            },
        },
    });
};

// Default theme (will be replaced with the current theme in the ThemeProvider)
const theme = createAppTheme('light');

export default theme;
