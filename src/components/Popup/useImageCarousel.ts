import { useContext } from 'react';
import { ImageCarouselContext } from './ImageCarouselProvider'; // Adjust the path as necessary

export const useImageCarousel = () => {
    const context = useContext(ImageCarouselContext);
    if (!context) {
        throw new Error('`useImageCarousel()` must be called inside a `ImageCarouselProvider` child.');
    }
    return context;
};