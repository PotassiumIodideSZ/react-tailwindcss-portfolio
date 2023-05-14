import { useEffect } from 'react';
import React from 'react';



const BackToTop = () => {
	const userScrollPosition = 0;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [userScrollPosition]);

	return <div></div>;
};

export default BackToTop;
