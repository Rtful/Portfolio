import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useImageCarousel} from "../Popup/ImageCarouselProvider.tsx";
import {useEffect} from "react";


function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export const ImageGallery = () => {
    const {showPopup, setImage, setImagePaths, setCurrentIndex} = useImageCarousel();

    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down('sm'));
    const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
    const isXl = useMediaQuery(theme.breakpoints.up('xl'));

    let cols = 2;
    if (isXs) cols = 2;
    else if (isSm) cols = 3;
    else if (isMd) cols = 4;
    else if (isLg) cols = 6;
    else if (isXl) cols = 8;

    // const [currentIndex, setCurrentIndex] = React.useState(0);


    useEffect(() => {
        setImagePaths(imagePaths);
    });

    return (
        <ImageList
            sx={{width: "100%", height: "auto"}}
            variant="quilted"
            cols={cols}
            // rowHeight={121}
        >
            {itemData.map((item, index) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 121, item.rows, item.cols)}
                        alt={item.title}
                        loading="lazy"
                        onClick={() => {
                            setImage(itemData[index].img);
                            setCurrentIndex(index);
                            console.log(index);
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
        img: 'src/assets/img/nice_house_blue_sky.JPG',
        title: 'Breakfast',
        rows: 1,
        cols: 2,
    }, {
        img: 'src/assets/img/white_flowers.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/gravestones.JPG',
        title: 'Breakfast',
        rows: 1,
        cols: 2,
    }, {
        img: 'src/assets/img/old_car.JPG',
        title: 'Breakfast',
        rows: 1,
        cols: 2,
    }, {
        img: 'src/assets/img/0919961_0013.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/0919961_0014.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/0919961_0019.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/0919961_0023.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/kyoto_yellow_boat.JPG',
        title: 'Breakfast',
        rows: 1,
        cols: 2,
    }, {
        img: 'src/assets/img/0919961_0032.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/stone_lion.JPG',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/IMG_3168.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/IMG_3223.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/crab.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/colombian_flag.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/woman_umbrella_pink.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/rainbow_jellyfish.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/IMG_4665.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/penol_elevator.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/IMG_4669.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }, {
        img: 'src/assets/img/IMG_4706.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    }
];

// The image paths without anything else
const imagePaths = itemData.map(item => item.img);


