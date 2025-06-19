// Original component by Pandouby
// Adapted with permission for use in my portfolio
// Source: https://github.com/Pandouby/pandouby.github.io
import { FC } from "react";

interface LinkButtonProps {
	children: any;
	url?: string;
	className?: string;
}

export const LinkButton: FC<LinkButtonProps> = ({
	children,
	className,
	url,
}) => {
	return (
		<a className={`linkButton ${className}`} href={url}>
			{children}
		</a>
	);
};
