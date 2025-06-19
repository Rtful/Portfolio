// Original component by Pandouby
// Adapted with permission for use in my portfolio
// Source: Pandouby/pandouby.github.io
import { FaJava, FaLinkedin } from "react-icons/fa";
import {
	SiDocker,
	SiGit,
	SiGithub,
	SiJira,
	SiReact,
	SiSpring,
	SiTypescript,
} from "react-icons/si";
import { HiMail } from "react-icons/hi";
import { ReactElement } from "react";

export interface Skill {
	name: string;
	icon: ReactElement;
	percentage: number;
}

export interface Project {
	title: string;
	url: string;
	description?: string;
	hasGithub: boolean;
}

export interface SocialType {
	name: string;
	icon: ReactElement;
	url?: string;
	onClick?: () => void;
}

interface ConfigData {
	skills: Skill[];
	projects: Project[];
	socials: SocialType[];
}

export const configData: ConfigData = {
	skills: [
		{
			name: "React",
			icon: <SiReact className="icon-container" id="React" />,
			percentage: 85,
		},
		{
			name: "TypeScript",
			icon: <SiTypescript className="icon-container" id="TypeScript" />,
			percentage: 90,
		},
		{
			name: "Java",
			icon: <FaJava className="icon-container" id="Java" />,
			percentage: 75,
		},
		{
			name: "Spring",
			icon: <SiSpring className="icon-container" id="Spring" />,
			percentage: 60,
		},
		{
			name: "Git",
			icon: <SiGit className="icon-container" id="Git" />,
			percentage: 90,
		},
		{
			name: "Docker",
			icon: <SiDocker className="icon-container" id="Docker" />,
			percentage: 60,
		},
		{
			name: "Jira",
			icon: <SiJira className="icon-container" id="Jira" />,
			percentage: 80,
		},
	],
	projects: [
		{
			title: "Portfolio Website",
			url: "rtful/portfolio",
			description: "My Portfolio Website to display my Skills and Projects",
			hasGithub: true,
		},
		{
			title: "Cad Models",
			url: "Rtful/CadModels",
			description: "Cad Models made by me. Limited to CAD that uses text based file formats",
			hasGithub: true,
		},
		{
			title: "Pico LCD",
			url: "Rtful/picoLCD",
			description: "Program for the Raspberry Pi Pico that allows it to write text to an LCD screen",
			hasGithub: true,
		},
		{
			title: "Spotify Keychains Generator",
			url: "Rtful/SpotifyKeyChainGenerator",
			description: "Generates STL file of a Spotify keychain using Blender",
			hasGithub: false,
		},
		{
			title: "Spotify Keychain",
			url: "rtful/SpotifyKeychainFrontend",
			description: "A Project with a friend that allows you to geretate a spotify-code-keychain by only entering a song name or link",
			hasGithub: false,
		},
	],
	socials: [
		{
			name: "Mail",
			icon: <HiMail />,
			onClick: () => {
				navigator.clipboard
					.writeText("silvan@ggaweb.ch")
					.then(() => {
						alert(`Copied!`);
					})
					.catch((error) => {
						alert(`Copy failed! ${error}`);
					});
				window.location.href =
					"mailto:silvan@ggaweb.ch?subject=Contact";
			},
		},
		{
			name: "LinkedIn",
			icon: <FaLinkedin />,
			url: "https://www.linkedin.com/in/aaronholenstein/",
		},
		{
			name: "GitHub",
			icon: <SiGithub />,
			url: "https://www.github.com/rtful",
		},
	],
};
