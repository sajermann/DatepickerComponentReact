import { ReactElement } from 'react';

export type TFeedbackProps = {
	loadingOptions: {
		isLoading: boolean;
		typeLoadingIcon?: 'Default' | 'Points';
		customIcon?: ReactElement;
		fullIcon?: boolean;
	};
	successOptions?: {
		success: boolean;
		customIcon?: ReactElement;
		fullIcon?: boolean;
	};
	failedOptions?: {
		failed: boolean;
		customIcon?: ReactElement;
		fullIcon?: boolean;
	};
};
