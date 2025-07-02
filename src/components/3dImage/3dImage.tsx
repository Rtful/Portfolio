import React, {FC, useRef, useState} from "react";
import './3dImage.scss';

export type ImageData = { path: string; name: string };

type ThreeDImageProps = ImageData & {
    onClick?: () => void;
};

export const ThreeDImage: FC<ThreeDImageProps> = ({
                                                      path,
                                                      name,
                                                      onClick
                                                  }) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const boundsRef = useRef<DOMRect>();
    const [transform, setTransform] = useState('');
    const [glowBackground, setGlowBackground] = useState('');

    const rotateToMouse = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const img = imgRef.current;
        if (!img) return;

        if (!boundsRef.current) {
            boundsRef.current = img.getBoundingClientRect();
        }

        const bounds = boundsRef.current;
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2,
        };
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        setTransform(`
            scale3d(1.07, 1.07, 1.07)
            rotate3d(
                ${center.y / 100},
                ${-center.x / 100},
                0,
                ${Math.log(distance) * 2}deg
            )`);

        setGlowBackground(`
            radial-gradient(
              circle at
              ${center.x * 2 + bounds.width / 2}px
              ${center.y * 2 + bounds.height / 2}px,
              #ffffff55,
              #0000000f
            )`);
    }

    return (
        <div
            className={'three-d-image-wrapper'}
            onMouseMove={rotateToMouse}
            onMouseLeave={() => {
                setTransform('');
                setGlowBackground('');
            }}
            onClick={onClick}
        >
            <div
                ref={imgRef}
                className={'three-d-image'}
                style={{transform}}
            >
                <img
                    className={'image-card'}
                    src={path}
                    alt={name}
                />
                <div
                    className="glow"
                    style={{background: glowBackground}}
                />
            </div>
        </div>
    );
};