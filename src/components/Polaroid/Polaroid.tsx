import './Polaroid.css';
import Dialog from "@mui/material/Dialog";
import React from "react";
import {ImageWithOrientation} from "../../interfaces/ImageWithOrientation.ts";

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

    const paperProps = {
        backdrop: {
            invisible: !raiseAbove,
        },
        paper: {
            elevation: raiseAbove ? 24 : 6,
            sx: {
                ...style,
                height: image.orientation === 'landscape' ? 'unset' : '100%',
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