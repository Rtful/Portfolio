import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ImageGallery} from "./components/ImageGallery/ImageGallery.tsx";
import {ThemeContext} from "./contexts/theme-context";
import {ImageCarouselProvider} from "./components/ImageCarousel/ImageCarouselProvider.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import './App.css'
import {ProjectsPage} from "./components/ProjectsPage/ProjectsPage.tsx";
import {FC, useState} from "react";

export const App: FC = () => {
    const isBrowserDefaultDark = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const getDefaultTheme = (): string => {
        const localStorageTheme = localStorage.getItem("default-theme");
        const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
        return localStorageTheme || browserDefault;
    };

    const [theme, setTheme] = useState(getDefaultTheme());
    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <ImageCarouselProvider>
                <Router>
                    <Navbar/>
                    <div id="main" className={`theme-${theme}`}>
                        <Routes>
                            <Route path="/gallery" element={<ImageGallery/>}/>
                            <Route path="/projects" element={<ProjectsPage/>}/>
                            {/* Add more routes as needed */}
                        </Routes>
                    </div>
                </Router>
            </ImageCarouselProvider>
        </ThemeContext.Provider>
    );
}

export default App;
