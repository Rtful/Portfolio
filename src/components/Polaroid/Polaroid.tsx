import useMediaQuery from "@mui/material/useMediaQuery";
import './Polaroid.css';
import Dialog from "@mui/material/Dialog";
import React from "react";
import {ImageWithOrientation} from "../../interfaces/ImageWithOrientation.ts";
import {useTheme, createAppTheme} from "../../theme/theme.ts";


let fontLoaded = false;

function ensurePermanentMarkerFontLoaded() {
    if (fontLoaded) return;

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    fontLoaded = true;
}


type PolaroidProps = {
    isOpen?: boolean;
    style?: object
    onClick?: () => void
    onClose?: () => void
    image: ImageWithOrientation;
    raiseAbove?: boolean;
};

export const Polaroid: React.FC<PolaroidProps> = ({
                                                      isOpen = false,
                                                      image,
                                                      style = {},
                                                      onClick = () => {
                                                      },
                                                      onClose = () => {
                                                      },
                                                      raiseAbove = false,
                                                  }) => {
    const {theme: currentTheme} = useTheme();
    const muiTheme = createAppTheme(currentTheme);

    React.useEffect(() => {
        ensurePermanentMarkerFontLoaded();
    }, []);

    const isMdUp = useMediaQuery(muiTheme.breakpoints.up('md')); // true if ≥900px

    const paperProps = {
        backdrop: {
            invisible: !raiseAbove,
        },
        paper: {
            elevation: raiseAbove ? 24 : 6,
            sx: {
                // Default height (for square images)
                height: isMdUp ? '80%' : 'unset',
                ...style,
                zIndex: raiseAbove ? 1500 : 1300,
                margin: raiseAbove ? '10%' : 'none',
            }
        },
        root: {
            sx: {
                zIndex: raiseAbove ? 1500 : 1300,
            }
        }
    }

    if (image.aspectRatio > 1) {
        // Landscape
        paperProps.paper.sx.height = 'unset';
    } else if (image.aspectRatio < 1) {
        // Portrait
        paperProps.paper.sx.height = '80%';
    }


    return (<Dialog
        maxWidth="lg"
        open={isOpen}
        onClick={onClick}
        className="no-pointer-events"
        slotProps={paperProps}
        onClose={onClose}
        closeAfterTransition={false}
    >
        <div
            className="polaroid"
            onClick={onClick}
            style={{backgroundColor: muiTheme.palette.primary.main}}
        >
            <div className="modal-content">
                <img
                    id="focused-image"
                    alt="focused image"
                    src={image.path}
                /> <span
                className="image-title">{image.name}</span>
            </div>
        </div>
    </Dialog>);
}