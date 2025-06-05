import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Polaroid} from "../Polaroid/Polaroid.tsx";
import {Backdrop} from "@mui/material";
import {ImageWithOrientation} from "../../interfaces/ImageWithOrientation.ts";

interface ImageCarouselProviderProps {
    children: ReactNode;
}

interface ImageCarouselContextType {
    showPopup: () => void;
    setCurrentIndex: (index: number) => void;
    setImages: (images: ImageWithOrientation[]) => void;
    images: ImageWithOrientation[];
}

export const ImageCarouselContext = createContext<ImageCarouselContextType | undefined>(undefined);

/**
 * Provides a popup which is handled with a context
 */
export const ImageCarouselProvider: React.FC<ImageCarouselProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<ImageWithOrientation[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const showPopup = () => {
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);

        // This is to prevent the aria-hidden warning when the dialog is closed
        const el = document.querySelector('[tabindex="' + currentIndex + '"]');
        if (el instanceof HTMLElement) {
            el.focus();
        }
    };

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!isOpen) return;
            if (e.key === "Escape") {
                closePopup();
            } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (e.key === "ArrowLeft" && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const previousImage = images[currentIndex - 1];
    const currentImage = images[currentIndex];
    const nextImage = images[currentIndex + 1];

    const previousImageStyle: React.CSSProperties = {
        transform: 'rotate(-10deg) scale(0.7)',
    };
    const nextImageStyle: React.CSSProperties = {
        transform: 'rotate(10deg) scale(0.7)',
    };

    previousImageStyle.marginLeft = '-75%';
    nextImageStyle.marginRight = '-75%';
    previousImageStyle.marginBottom = '-10%';
    nextImageStyle.marginTop = '-10%';

    return (
        <ImageCarouselContext.Provider value={{showPopup, setImages, setCurrentIndex, images}}>
            <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet"/>
            {children}
            <>
                <Backdrop
                    open={isOpen}
                    onClick={closePopup}
                    onKeyDown={(e) => e.stopPropagation()}
                />

                {currentImage && (
                    <Polaroid
                        isOpen={isOpen}
                        image={currentImage}
                        onClose={closePopup}
                        style={{
                            pointerEvents: 'none',
                        }}
                        raiseAbove={true}
                    />
                )}
                {nextImage && (
                    <Polaroid
                        isOpen={isOpen}
                        image={nextImage}
                        onClose={closePopup}
                        style={nextImageStyle}
                        onClick={() => {
                            setCurrentIndex(currentIndex + 1);
                        }}
                    />
                )}
                {previousImage && (
                    <Polaroid
                        isOpen={isOpen}
                        image={previousImage}
                        onClose={closePopup}
                        style={previousImageStyle}
                        onClick={() => {
                            setCurrentIndex(currentIndex - 1);
                        }}
                    />
                )}
            </>
        </ImageCarouselContext.Provider>
    );
};