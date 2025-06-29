import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './ImageGallery.css';

import { useEffect, useState } from "react";
import { useImageCarousel } from "../../components/ImageCarousel/UseImageCarousel.ts";
import { ImageWithOrientation } from "../../interfaces/ImageWithOrientation.ts";

export const ImageGallery = () => {
    const { showPopup, setImages, setCurrentIndex, images } = useImageCarousel();
    const [loading, setLoading] = useState(true);

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    let cols = 1;
    if (isXs) cols = 1;
    else if (isSm) cols = 2;
    else if (isMd) cols = 3;
    else if (isLg) cols = 4;
    else if (isXl) cols = 4;

    type ImageData = { path: string; name: string };

    useEffect(() => {
        const imagesFromFS = import.meta.glob('/src/assets/img/*.(png|jpg|jpeg|svg|gif|webp)');
        const imageObject: ImageData[] = Object.keys(imagesFromFS).map((path) => {
            const parts = path.split('/');
            const fileName = parts[parts.length - 1];
            const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
            return { path, name: nameWithoutExtension };
        });

        async function classifyImageOrientations(images: ImageData[]): Promise<ImageWithOrientation[]> {
            return Promise.all(images.map(img => {
                return new Promise<ImageWithOrientation>((resolve) => {
                    const image = new Image();
                    image.onload = () => {
                        const aspectRatio = image.naturalWidth / image.naturalHeight;
                        resolve({ ...img, aspectRatio });
                    };
                    image.onerror = () => {
                        resolve({ ...img, aspectRatio: 1 });
                    };
                    image.src = img.path;
                });
            }));
        }

        classifyImageOrientations(imageObject).then((calculatedImages) => {
            setImages(calculatedImages);
            setLoading(false);
        });
    }, [setImages]);

    if (loading) {
        return (
            <div className="loading-screen">
                <h1>Loading Gallery...</h1>
            </div>
        );
    }

    return (
        <>
            <h1>Gallery</h1>
            <ImageList
                sx={{ width: "100%", height: "auto" }}
                variant="masonry"
                cols={cols}
                gap={12}
            >
                {images.map((item, index) => (
                    <ImageListItem key={index}>
                        <img
                            src={item.path}
                            alt={item.name}
                            tabIndex={index}
                            onClick={() => {
                                setCurrentIndex(index);
                                showPopup();
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </>
    );
};