import './App.css'
import {ImageGallery} from "./components/ImageGallery/ImageGallery.tsx";
import {ImageCarouselProvider} from "./components/ImageCarousel/ImageCarouselProvider.tsx";

function App() {

    return (
        <ImageCarouselProvider>
            <ImageGallery/>
        </ImageCarouselProvider>
    )
}

export default App
