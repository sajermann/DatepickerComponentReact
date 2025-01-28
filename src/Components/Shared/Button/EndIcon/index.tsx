import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TFeedbackProps } from '~/components/shared/Input/Types/TFeedbackProps';
import { showInDevelopment } from '~/utils/showInDevelopment';

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
