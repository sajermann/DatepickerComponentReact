import { useEffect, useState } from 'react';

export function useWindow() {
	const [scrollPosition, setScrollPosition] = useState(0);
	const [view] = useState({
		width: Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		),
		height: Math.max(
			document.documentElement.clientHeight || 0,
			window.innerHeight || 0
		),
	});

	useEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener('scroll', updatePosition);

		return () => window.removeEventListener('scroll', updatePosition);
	}, []);

	return { scrollPosition, view };
}
