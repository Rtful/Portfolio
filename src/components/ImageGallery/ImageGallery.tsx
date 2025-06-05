import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useEffect} from "react";
import {useImageCarousel} from "../ImageCarousel/UseImageCarousel.ts";
import {Orientation} from "../../interfaces/Orientation.ts";
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
        async function classifyImageOrientations(images: ImageData[]): Promise<ImageWithOrientation[]> {
            return Promise.all(images.map(img => {
                return new Promise<ImageWithOrientation>((resolve) => {
                    const image = new Image();
                    image.onload = () => {
                        let orientation: Orientation = 'square';
                        if (image.naturalHeight > image.naturalWidth) {
                            orientation = 'portrait';
                        } else if (image.naturalWidth > image.naturalHeight) {
                            orientation = 'landscape';
                        }
                        resolve({...img, orientation});
                    };
                    image.onerror = () => {
                        resolve({...img, orientation: 'landscape'});
                    };
                    image.src = img.path;
                });
            }));
        }

        classifyImageOrientations(itemData).then((calculatedImages) => {
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

const itemData = [
    {
        path: 'src/assets/img/nice_house_blue_sky.JPG',
        name: 'A beautiful house in Kyoto'
    }, {
        path: 'src/assets/img/square.jpg',
        name: 'A square image'
    }, {
        path: 'src/assets/img/gravestones.JPG',
        name: 'Gravestones in west Kyoto'
    }, {
        path: 'src/assets/img/white_flowers.JPG',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/temple.JPG',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/gravestones.JPG',
        name: 'Gravestones in west Kyoto'
    }, {
        path: 'src/assets/img/old_car.JPG',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/temple_green_leaves.JPG',
        name: 'Temple in Ktoyo'
    }, {
        path: 'src/assets/img/kyoto_overview.JPG',
        name: 'View of Kyoto'
    }, {
        path: 'src/assets/img/kyoto_narrow_view.JPG',
        name: 'Glimpse into Kyoto'
    }, {
        path: 'src/assets/img/kyoto_yellow_boat.JPG',
        name: 'Boat in Kyoto'
    }, {
        path: 'src/assets/img/bamboo_path.JPG',
        name: 'Path through bamboo in Kyoto'
    }, {
        path: 'src/assets/img/stone_lion.JPG',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/elevator_colombia.jpg',
        name: 'Goods Elevator at el Piedra del Peñol'
    }, {
        path: 'src/assets/img/piedra.jpg',
        name: 'El Piedra del Peñol'
    }, {
        path: 'src/assets/img/crab.jpg',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/colombian_flag.jpg',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/woman_umbrella_pink.jpg',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/rainbow_jellyfish.jpg',
        name: 'Breakfast'
    }, {
        path: 'src/assets/img/jellyfish_single.jpg',
        name: 'A Jellyfish in the Tokyo Aquarium'
    }, {
        path: 'src/assets/img/jellyfish_multiple_blue.jpg',
        name: 'Many Blue Jellyfish'
    }, {
        path: 'src/assets/img/jellyfish_multiple.jpg',
        name: 'Multiple Jellyfish'
    }, {
        path: 'src/assets/img/thousand_torii.jpg',
        name: '"Thousand Gates" - Kyoto'
    }
];