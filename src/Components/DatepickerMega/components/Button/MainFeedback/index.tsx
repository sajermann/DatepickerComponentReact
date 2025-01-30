import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { showInDevelopment } from '~/utils/showInDevelopment';
import { TFeedbackProps } from '../types/TFeedbackProps';

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
