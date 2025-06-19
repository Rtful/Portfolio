// Original component by Pandouby
// Adapted with permission for use in my portfolio
// Source: https://github.com/Pandouby/pandouby.github.io
import { FC, ReactElement, useState } from "react";
import "./styles.scss";
import { Card } from "./Card";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { Button } from "../Button/Button";
import Skeleton from "@mui/material/Skeleton";
import { SiGithub } from "react-icons/si";
import { LinkButton } from "../Button/LinkButton";
import { Project } from "../../config/config";
import { IoLogOutOutline } from "react-icons/io5";

interface ProjectCardProps {
	project: Project;
	children: ReactElement;
	style?: object;
}

export const ProjectCard: FC<ProjectCardProps> = ({ project, children }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [projectData, setProjectData] = useState(0);

	const handleClick = () => {
		setIsOpen(!isOpen);

		if (!isOpen && !projectData) {
			axios
				.get(`https://api.github.com/repos/${project.url}/languages`)
				.then((res) => {
					console.log(res.data)
					setProjectData(res.data);
				});
		}
	};

	const values: number[] = Object.values(projectData!);

	let totalValue = 0;
	values.forEach((value) => {
		totalValue = totalValue + value;
	});

	const percentages = values.map((value) => {
		return Math.round((value / totalValue) * 100);
	});

	const data = {
		labels: Object.keys(projectData!),
		datasets: [
			{
				label: "% of project",
				data: percentages,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)",
				],
				radius: "80%",
				cutout: "60%",
				hoverOffset: 25,
			},
		],
	};

	const options = {
		plugins: {
			title: {
				display: true,
				text: "Used Technologies",
			},
			legend: {
				display: true,
			},
		},
		responsive: true,
		aspectRatio: 1,
		layout: {
			padding: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
		},
		cutoutPercentage: 90,
	};

	return (
		<Card
			className={"projectCard"}
			title={project.title}
			data-isopen={isOpen}
		>
			{children}
			{isOpen && !projectData ? (
				<>
					<Skeleton
						variant="text"
						sx={{ fontSize: "2rem" }}
						width={250}
						animation={"wave"}
					/>
					<Skeleton
						variant="rounded"
						height={250}
						width={250}
						animation={"wave"}
					/>
				</>
			) : isOpen ? (
				<Doughnut
					className="doughnut"
					data={data}
					options={options}
					height={"400px"}
					width={"400px"}
				/>
			) : null}

			<footer>
				<Button className="button-more" onClick={handleClick}>
					{isOpen ? "show less" : "show more"}
				</Button>
				<LinkButton
					className="button-github"
					url={`http://songkeychain.dodger.ch:5173/`}
				>
					{project.hasGithub ? <SiGithub /> : <IoLogOutOutline />}
				</LinkButton>
			</footer>
		</Card>
	);
};
