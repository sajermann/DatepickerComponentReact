import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TFeedbackProps } from '~/components/shared/Input/Types/TFeedbackProps';
import { showInDevelopment } from '~/utils/showInDevelopment';

interface IMainFeedback
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  withFeedback?: TFeedbackProps;
}

export default function _MainFeedback({
  withFeedback,
  ...rest
}: IMainFeedback) {
  if (
    withFeedback?.loadingOptions.isLoading ||
    withFeedback?.successOptions?.success ||
    withFeedback?.failedOptions?.failed
  ) {
    return (
      <div
        {...showInDevelopment({ 'data-content': 'mainFeedback' })}
        {...rest}
      />
    );
  }
  return null;
}
