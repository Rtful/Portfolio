import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ImageGallery} from "./pages/ImageGallery/ImageGallery.tsx";
import {ImageCarouselProvider} from "./components/ImageCarousel/ImageCarouselProvider.tsx";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import './App.scss'
import {ProjectsPage} from "./pages/ProjectsPage/ProjectsPage.tsx";
import {FC, useEffect} from "react";
import themes from "./theme/palette";
import {useTheme} from "./theme/theme";
import {ModelsPage} from "./pages/ModelsPage/ModelsPage.tsx";
import {AboutMe} from "./pages/AboutMe/AboutMe.tsx";

const navItems = [
    {label: 'Gallery', to: '/gallery'},
    {label: 'Projects', to: '/projects'},
    {label: '3D-Models', to: '/models'},
];

export const App: FC = () => {
    const {theme} = useTheme();
    ChartJS.register(ArcElement, Tooltip, Legend);

    // Set CSS variables based on the current theme
    useEffect(() => {
        const currentTheme = themes[theme as keyof typeof themes];
        if (currentTheme) {
            Object.entries(currentTheme).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--theme-${key}`, value as string);
            });
        }
    }, [theme]);

    return (
        <ImageCarouselProvider>
            <Router>
                <div className={`theme-${theme}`} style={{height: '100%'}}>
                    <Navbar
                        navItems={navItems}
                    />
                    <div id="main">
                        <Routes>
                            <Route path="/gallery" element={<ImageGallery/>}/>
                            <Route path="/projects" element={<ProjectsPage/>}/>
                            <Route path="/models" element={<ModelsPage/>}/>
                            {/* Add more routes as needed */}
                        </Routes>
                    </div>
                </div>
            </Router>
        </ImageCarouselProvider>
    );
}

export default App;
