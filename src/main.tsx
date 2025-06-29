import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeContext, createAppTheme } from './theme/theme';

const Root = () => {
  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme());
  const muiTheme = createAppTheme(theme);

  return (
    <StrictMode>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline /> {/* Optional: normalize MUI baseline styles */}
          <App />
        </ThemeProvider>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')!).render(<Root />);
