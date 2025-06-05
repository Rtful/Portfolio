import {useContext} from "react";
import {ImageCarouselContext} from "./ImageCarouselProvider.tsx";

export const useImageCarousel = () => {
    const context = useContext(ImageCarouselContext);
    if (context === undefined) {
        throw new Error('useEnvironmentController must be used within an EnvironmentControllerProvider');
    }
    return context;
};