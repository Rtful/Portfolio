import React, {createContext, ReactNode, useState} from 'react';
import {Polaroid} from "../Polaroid/Polaroid.tsx";
import {Backdrop} from "@mui/material";
import {Image} from "../../interfaces/Image.ts";

interface ImageCarouselProviderProps {
    children: ReactNode;
}

interface ImageCarouselContextType {
    showPopup: () => void;
    setCurrentIndex: (index: number) => void;
    setImages: (images: Image[]) => void;
}

export const ImageCarouselContext = createContext<ImageCarouselContextType | undefined>(undefined);

/**
 * Provides a popup which is handled with a context
 */
export const ImageCarouselProvider: React.FC<ImageCarouselProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<Image[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    const previousImage = images[currentIndex - 1];
    const currentImage = images[currentIndex];
    const nextImage = images[currentIndex + 1];

    return (
        <ImageCarouselContext.Provider value={{showPopup, setImages, setCurrentIndex}}>
            <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet"/>
            {children}
            <>
                <Backdrop
                    open={isOpen}
                    onClick={closePopup}
                />

                {nextImage && (
                    <Polaroid
                        isOpen={isOpen}
                        image={nextImage}
                        elevation={6}
                        style={{
                            marginLeft: '-50%',
                            transform: 'rotate(-10deg) scale(0.7)',
                        }}
                        onClick={() => {
                            setCurrentIndex(currentIndex + 1);
                        }}
                        noBackdrop={true}
                    />
                )}
                {previousImage && (
                    <Polaroid
                        isOpen={isOpen}
                        image={previousImage}
                        elevation={6}
                        style={{
                            marginLeft: '50%',
                            transform: 'rotate(10deg) scale(0.7)',
                        }}
                        onClick={() => {
                            setCurrentIndex(currentIndex - 1);
                        }}
                        noBackdrop={true}
                    />
                )}
                {currentImage && (
                    <Polaroid
                        isOpen={isOpen}
                        image={currentImage}
                        elevation={12}
                        style={{
                            pointerEvents: 'none',
                        }}
                        noBackdrop={true}
                    />
                )}
            </>
        </ImageCarouselContext.Provider>
    );
};