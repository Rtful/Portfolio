// Original component by Pandouby
// Adapted with permission for use in my portfolio
// Source: https://github.com/Pandouby/pandouby.github.io

import { motion } from "framer-motion";
import { FC, useRef } from "react";
import "./styles.scss";

interface CardProps {
	title?: string;
	children: any;
	style?: object;
	onClick?: () => void;
	className?: string;
	width?: string;
	height?: string;
}

export const Card: FC<CardProps> = ({
	title,
	children,
	style,
	className,
	width,
	height,
	...props
}) => {
	const ref = useRef(null);

	return (
		<motion.div
			layout
			className={`card-wrapper ${className}`}
			ref={ref}
			style={{
				...style,
				width,
				height,
			}}
			{...props}
		>
			<div className="card card-front">
				<div className="card-content">
					<h2 className="card-title">{title}</h2>
					{children}
				</div>
			</div>
			<div className="card card-back"></div>
		</motion.div>
	);
};
