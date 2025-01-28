import { Icons } from '~/components/shared/Icons';
import { TFeedbackProps } from '~/components/shared/Input/Types/TFeedbackProps';

interface ILoadingIcon {
  withFeedback?: TFeedbackProps;
}

export default function _LoadingIcon({ withFeedback }: ILoadingIcon) {
  if (
    withFeedback?.loadingOptions.isLoading &&
    !withFeedback?.loadingOptions.customIcon
  ) {
    if (withFeedback.loadingOptions.typeLoadingIcon === 'Points') {
      return <Icons nameIcon="loadingPoints" />;
    }
    return <Icons nameIcon="loadingCircle" />;
  }

  if (
    withFeedback?.loadingOptions.isLoading &&
    withFeedback?.loadingOptions.customIcon
  ) {
    return withFeedback.loadingOptions.customIcon;
  }
  return null;
}
