import { useContext, useEffect } from 'react';
import { DatepickerMegaContext } from '../DatepickerMegaProvider';

export function useDatepickerMega(props?: { hasTrigger?: boolean }) {
	const { setHasTrigger, ...rest } = useContext(DatepickerMegaContext);

	useEffect(() => {
		if (props?.hasTrigger) {
			setHasTrigger(props.hasTrigger);
		}
	}, [props]);

	return {
		...rest,
	};
}
