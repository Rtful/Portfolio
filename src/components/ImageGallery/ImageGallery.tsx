import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useEffect, useState} from "react";
import {useImageCarousel} from "../ImageCarousel/UseImageCarousel.ts";
import {Orientation} from "../../interfaces/Orientation.ts";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export const ImageGallery = () => {
    const {showPopup, setImages, setCurrentIndex} = useImageCarousel();
    const [test, setTest] = useState<ImageWithOrientation[]>([]);

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
    type ImageWithOrientation = ImageData & { orientation: Orientation };

    // const [currentIndex, setCurrentIndex] = React.useState(0);

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
                        // Fallback if image can't be loaded
                        resolve({...img, orientation: 'landscape'});
                    };
                    image.src = img.path;
                });
            }));
        }

        classifyImageOrientations(itemData).then((calculatedImages) => {
            setTest(calculatedImages);
            setImages(calculatedImages);
        });
    }, [setImages, setTest]);

    return (
        <ImageList
            sx={{width: "100%", height: "auto"}}
            variant="quilted"
            cols={cols}
        >
            {test.map((item, index) => {
                const isPortrait = item.orientation === 'portrait';

                let cols = 1;
                let rows = 1;

                if (item.orientation === 'portrait') {
                    cols = 1;
                    rows = 2;
                } else if (item.orientation === 'landscape') {
                    cols = 1;
                    rows = 1;
                }

                return (
                    <ImageListItem
                        key={item.path}
                        cols={cols || 1}
                        rows={rows || 1}
                        className={isPortrait ? 'portrait-item' : 'landscape-item'}
                    >
                        <img
                            {...srcset(item.path, 121, rows, cols)}
                            alt={item.name}
                            loading="lazy"
                            onClick={() => {
                                // setImage(itemData[index].path);
                                setCurrentIndex(index);
                                showPopup();
                            }}
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
}

const itemData = [
    {
        path: 'src/assets/img/nice_house_blue_sky.JPG',
        name: 'A beautiful house in Kyoto'
    }, {
        path: 'src/assets/img/high.jpg',
        name: 'Very high image'
    }, {
        path: 'src/assets/img/wide.jpg',
        name: 'Very wide image'
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