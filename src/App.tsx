import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ImageGallery} from "./components/ImageGallery/ImageGallery.tsx";
import {ImageCarouselProvider} from "./components/ImageCarousel/ImageCarouselProvider.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import './App.css'
import {ProjectsPage} from "./components/ProjectsPage/ProjectsPage.tsx";
import {FC} from "react";

export const App: FC = () => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    return (
        <ImageCarouselProvider>
            <Router>
                <Navbar/>
                <div id="main">
                    <Routes>
                        <Route path="/gallery" element={<ImageGallery/>}/>
                        <Route path="/projects" element={<ProjectsPage/>}/>
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </Router>
        </ImageCarouselProvider>
    );
}

export default App;
