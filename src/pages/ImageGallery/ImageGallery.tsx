import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import './ImageGallery.scss';
import {ThreeDImage} from "../../components/3dImage/3dImage";

import {useEffect, useState} from "react";
import {useImageCarousel} from "../../components/ImageCarousel/UseImageCarousel.ts";
import {ImageWithOrientation} from "../../interfaces/ImageWithOrientation.ts";
import {Loader} from "../../components/Loader/Loader.tsx";

export const ImageGallery = () => {
    const {showPopup, setImages, setCurrentIndex, images} = useImageCarousel();
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
            return {path, name: nameWithoutExtension};
        });

        async function classifyImageOrientations(images: ImageData[]): Promise<ImageWithOrientation[]> {
            return Promise.all(images.map(img => {
                return new Promise<ImageWithOrientation>((resolve) => {
                    const image = new Image();
                    image.onload = () => {
                        const aspectRatio = image.naturalWidth / image.naturalHeight;
                        resolve({...img, aspectRatio});
                    };
                    image.onerror = () => {
                        resolve({...img, aspectRatio: 1});
                    };
                    image.src = img.path;
                });
            }));
        }

        classifyImageOrientations(imageObject).then((calculatedImages) => {
            setImages(calculatedImages);
        });
    }, [setImages]);

    useEffect(() => {
        if (images.length === 0) return;

        const imgElements = Array.from(document.querySelectorAll('.three-d-image-container img')) as HTMLImageElement[];

        let remaining = imgElements.length;

        if (remaining === 0) {
            setLoading(false);
            return;
        }

        const onLoad = () => {
            remaining--;
            if (remaining === 0) setLoading(false);
        };

        imgElements.forEach((img) => {
            if (img.complete) {
                remaining--;
            } else {
                img.addEventListener('load', onLoad);
                img.addEventListener('error', onLoad);
            }
        });

        if (remaining === 0) setLoading(false);

        return () => {
            imgElements.forEach((img) => {
                img.removeEventListener('load', onLoad);
                img.removeEventListener('error', onLoad);
            });
        };
    }, [images]);

    return (
        <>
            {
                <Loader type={"square"}
                        text={"Loading images"}
                        isLoading={loading}
                />
            }
            <h1>Gallery</h1>
            <ImageList
                className="image-list"
                sx={{width: "100%", height: "auto"}}
                variant="masonry"
                cols={cols}
                gap={30}
            >
                {images.map((item, index) => (
                    <ImageListItem key={index} className="three-d-image-container">
                        <ThreeDImage
                            path={item.path}
                            name={item.name}
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