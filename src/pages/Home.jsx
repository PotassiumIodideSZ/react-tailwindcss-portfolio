import { Link } from 'react-router-dom';
import AppBanner from '../components/shared/AppBanner';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import { ProjectsProvider } from '../context/ProjectsContext';
import Button from '../components/reusable/Button';
import React from 'react';



const Home = () => {
	return (
		<div className="container mx-auto">
			<AppBanner></AppBanner>
			
			<ProjectsProvider>
				<ProjectsGrid></ProjectsGrid>
			</ProjectsProvider>

			<div className="mt-4 sm:mt-4 flex justify-center"></div>
		</div>
	);
};

export default Home;
