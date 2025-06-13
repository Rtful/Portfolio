import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useEffect} from "react";
import {useImageCarousel} from "../ImageCarousel/UseImageCarousel.ts";
import {Orientation} from "@mui/material";
import {ImageWithOrientation} from "../../interfaces/ImageWithOrientation.ts";

export const ImageGallery = () => {
    const {showPopup, setImages, setCurrentIndex, images} = useImageCarousel();

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
    else if (isXl) cols = 5;

    type ImageData = { path: string; name: string };

    useEffect(() => {
        const imagesFromFS = import.meta.glob('/src/assets/img/*.(png|jpg|jpeg|svg|gif|webp)');
        const imageObject: { path: string; name: string }[] = Object.keys(imagesFromFS).map((path) => {
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
                        const orientation: Orientation = image.naturalHeight < image.naturalWidth ? 'horizontal' : 'vertical';
                        const aspectRatio = image.naturalWidth / image.naturalHeight;
                        resolve({...img, orientation, aspectRatio});
                    };
                    image.onerror = () => {
                        resolve({...img, orientation: 'horizontal', aspectRatio: 1});
                    };
                    image.src = img.path;
                });
            }));
        }

        classifyImageOrientations(imageObject).then((calculatedImages) => {
            setImages(calculatedImages);
        });
    }, [setImages]);

    return (
        <ImageList
            sx={{width: "100%", height: "auto"}}
            variant="masonry"
            cols={cols}
        >
            {images.map((item, index) => (
                <ImageListItem key={item.path}>
                    <img
                        src={item.path}
                        alt={item.name}
                        loading="lazy"
                        tabIndex={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            showPopup();
                        }}
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}