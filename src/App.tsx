import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ImageGallery} from "./components/ImageGallery/ImageGallery.tsx";
import {ImageCarouselProvider} from "./components/ImageCarousel/ImageCarouselProvider.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import './App.css'

function App() {
    return (
        <ImageCarouselProvider>
            <Router>
                <Navbar/>
                <div id="main">
                    <Routes>
                        <Route path="/gallery" element={<ImageGallery/>}/>
                        {/* Add more routes as needed */}
                    </Routes>
                </div>
            </Router>
        </ImageCarouselProvider>
    );
}

export default App;
