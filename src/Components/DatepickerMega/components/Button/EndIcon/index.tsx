import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { showInDevelopment } from '~/utils/showInDevelopment';
import { TFeedbackProps } from '../types/TFeedbackProps';

interface IEndIcon
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  withFeedback?: TFeedbackProps;
}

export default function _EndIcon({ withFeedback, ...rest }: IEndIcon) {
  if (
    rest.children &&
    !withFeedback?.loadingOptions.isLoading &&
    !withFeedback?.successOptions?.success &&
    !withFeedback?.failedOptions?.failed
  ) {
    return (
      <div {...showInDevelopment({ 'data-content': 'endIcon' })} {...rest} />
    );
  }
  return null;
}
