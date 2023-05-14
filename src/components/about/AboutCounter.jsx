import { useCountUp } from 'react-countup';
import CounterItem from './CounterItem';

import React from 'react';

const AboutCounter = () => {
	useCountUp({ ref: 'experienceCounter', end: 3, duration: 2 });
	useCountUp({ ref: 'githubStarsCounter', end: 96, duration: 2 });
	useCountUp({ ref: 'feedbackCounter', end: 92, duration: 2 });
	useCountUp({ ref: 'projectsCounter', end: 100, duration: 2 });

	return (
		<div className="mt-10 sm:mt-20 bg-primary-light dark:bg-ternary-dark shadow-sm">
			<div className="font-general-medium container mx-auto py-20 block sm:flex sm:justify-between items-center">
				<CounterItem
					title="Года опыта"
					counter={<span id="experienceCounter" />}
					measurement=""
				/>

				<CounterItem
					title="Проектов закончено"
					counter={<span id="githubStarsCounter" />}
					measurement="%"
				/>

				<CounterItem
					title="Позитвного фитбека"
					counter={<span id="feedbackCounter" />}
					measurement="%"
				/>

				<CounterItem
					title="Мотивации"
					counter={<span id="projectsCounter" />}
					measurement="%"
				/>
			</div>
		</div>
	);
};

export default AboutCounter;
