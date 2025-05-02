import React, {createContext, ReactNode, useContext, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import './ImageCarouselProvider.css';

interface ImageCarouselProviderProps {
    children: ReactNode;
}

interface ImageCarouselContextType {
    showPopup: () => void;
    setImage: (path: string) => void;
    setImagePaths: (paths: string[]) => void;
    setCurrentIndex: (index: number) => void;
}

export const ImageCarouselContext = createContext<ImageCarouselContextType | undefined>(undefined);

/**
 * Provides a popup which is handled with a context
 */
export const ImageCarouselProvider: React.FC<ImageCarouselProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState<string>('');
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showPopup = () => {
        console.log("opening popup")
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <ImageCarouselContext.Provider value={{showPopup, setImage, setImagePaths, setCurrentIndex}}>
            {children}
            <Dialog maxWidth="lg" onClose={closePopup} open={isOpen}>
                <div className="modal-wrap">
                    <img id="focused-image" alt="focused image" src={image}/>
                </div>
                <button
                    id="next"
                    className="modal-button"
                    disabled={currentIndex >= imagePaths.length - 1}
                    onClick={() => {
                        const nextIndex = currentIndex + 1;
                        setCurrentIndex(nextIndex)
                        setImage(imagePaths[nextIndex]);
                    }}>
                    <span>&#10095;</span>
                </button>
                <button
                    id="prev"
                    className="modal-button"
                    disabled={currentIndex <= 0}
                    onClick={() => {
                        const nextIndex = currentIndex - 1;
                        setCurrentIndex(nextIndex)
                        setImage(imagePaths[nextIndex]);
                    }}>
                    <span>&#10094;</span>
                </button>
            </Dialog>
        </ImageCarouselContext.Provider>
    );
};

export const useImageCarousel = () => {
    const context = useContext(ImageCarouselContext);
    if (context === undefined) {
        throw new Error('useEnvironmentController must be used within an EnvironmentControllerProvider');
    }
    return context;
};