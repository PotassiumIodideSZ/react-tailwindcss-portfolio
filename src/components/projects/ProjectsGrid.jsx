import { useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProjectSingle from './ProjectSingle';
import { ProjectsContext } from '../../context/ProjectsContext';
import ProjectsFilter from './ProjectsFilter';
import ClickerGame from '../../ClickerGame.js';
import React from 'react';


const ProjectsGrid = () => {
	const {
		projects,
		searchProject,
		setSearchProject,
		searchProjectsByTitle,
		selectProject,
		setSelectProject,
		selectProjectsByCategory,
	} = useContext(ProjectsContext);

	return (
		<section className="py-5 sm:py-10 mt-5 sm:mt-10">
			<div className="text-center">
				<p className="font-general-medium text-2xl sm:text-4xl mb-1 text-ternary-dark dark:text-ternary-light">
					Приложение
				</p>
			</div>

			<div className="mt-10 sm:mt-16">
				<h3
					className="font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-md
                        sm:text-xl
                        mb-3
                        "
				>
					Можете тут потыкать на противников
				</h3>
				<h4
					className="font-general-regular 
                        text-center text-secondary-dark
                        dark:text-ternary-light
                        text-sm
                        sm:text-md
                        mb-2
                        "
				>
					P.S. Броня увеличивает время боя. <br />
					P.P.S. С формулами скейла противников, характеристик и их ценами я явно накосячил, но и бог с ними.
				</h4>
				<div
					className="
                        flex
                        justify-between
                        border-b border-primary-light
                        dark:border-secondary-dark
                        pb-3
                        gap-3
						mt-8 sm:mt-10
						mb-8 sm:mt-10
                        "
				>
					
				</div>
			</div>

			<ClickerGame />
		</section>
	);
};

export default ProjectsGrid;
