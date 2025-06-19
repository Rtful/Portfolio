// Original component by Pandouby
// Adapted with permission for use in my portfolio
// Source: https://github.com/Pandouby/pandouby.github.io
import { FC } from "react";

interface ButtonProps {
	children: any;
	onClick?: any;
	className?: string;
}

export const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
	return (
		<button className={`button ${className}`} onClick={onClick}>
			{children}
		</button>
	);
};
