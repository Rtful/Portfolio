import React, {createContext, ReactNode, useEffect, useState} from 'react';
import {Polaroid} from "../Polaroid/Polaroid.tsx";
import {Backdrop, useTheme, useMediaQuery} from "@mui/material";
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

const backgroundPolaroidScale = 0.7;

export const ImageCarouselContext = createContext<ImageCarouselContextType | undefined>(undefined);

/**
 * Provides a popup which is handled with a context
 */
export const ImageCarouselProvider: React.FC<ImageCarouselProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<ImageWithOrientation[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const theme = useTheme();
    const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

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
            } else if ((e.key === "ArrowRight" || e.key === "ArrowDown") && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if ((e.key === "ArrowLeft" || e.key === "ArrowUp") && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    });

    const previousImageStyle: React.CSSProperties = {
        transform: `rotate(-10deg) scale(${backgroundPolaroidScale})`,
    };
    const nextImageStyle: React.CSSProperties = {
        transform: `rotate(10deg) scale(${backgroundPolaroidScale})`,
    };


    const currAspectRatio = images[currentIndex]?.aspectRatio;
    const currImgMarginHorizontal = currAspectRatio > 1
        ? 80
        : (currAspectRatio * 80);

    const currImgMarginVertical = currAspectRatio > 1
        ? (80 / currAspectRatio) / backgroundPolaroidScale
        : 80 / backgroundPolaroidScale;

    if (isPhone) {
        nextImageStyle.marginBottom = `-${currImgMarginVertical}%`;
        previousImageStyle.marginTop = `-${currImgMarginVertical}%`;
    } else {
        nextImageStyle.marginRight = `-${currImgMarginHorizontal}%`;
        previousImageStyle.marginLeft = `-${currImgMarginHorizontal}%`;
    }

    return (
        <ImageCarouselContext.Provider value={{showPopup, setImages, setCurrentIndex, images}}>
            {children}
            <>
                <Backdrop
                    open={isOpen}
                    onClick={closePopup}
                    onKeyDown={(e) => e.stopPropagation()}
                />

                {images[currentIndex] && (
                    <Polaroid
                        isOpen={isOpen}
                        image={images[currentIndex]}
                        onClose={closePopup}
                        style={{
                            pointerEvents: 'none',
                        }}
                        raiseAbove={true}
                    />
                )}
                {images[currentIndex + 1] && (
                    <Polaroid
                        isOpen={isOpen}
                        image={images[currentIndex + 1]}
                        onClose={closePopup}
                        style={nextImageStyle}
                        onClick={() => {
                            setCurrentIndex(currentIndex + 1);
                        }}
                    />
                )}
                {images[currentIndex - 1] && (
                    <Polaroid
                        isOpen={isOpen}
                        image={images[currentIndex - 1]}
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