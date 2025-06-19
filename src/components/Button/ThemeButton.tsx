// Original component by Pandouby
// Adapted with permission for use in my portfolio
// Source: https://github.com/Pandouby/pandouby.github.io
import { FC, useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context";
import "./styles.scss";
import { MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { motion } from "framer-motion";

export const ThemeButton: FC = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const handleThemeChange = () => {
		const isCurrentDark = theme === "dark";
		setTheme(isCurrentDark ? "light" : "dark");
		localStorage.setItem("default-theme", isCurrentDark ? "light" : "dark");
	};

	return (
		<motion.button
			className="theme-button"
			onClick={handleThemeChange}
			layout
		>
			{theme === "light" ? (
				<MdLightMode className="theme-icon" />
			) : (
				<MdOutlineDarkMode className="theme-icon" />
			)}
		</motion.button>
	);
};
