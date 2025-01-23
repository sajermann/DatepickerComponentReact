import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TFeedbackProps } from '~/Components/Shared/Input/Types/TFeedbackProps';
import { useWindowSize } from '~/Hooks/UseWindowSize';
import { showInDevelopment } from '~/Utils/ShowInDevelopment';

interface IChildren
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  withFeedback?: TFeedbackProps;
}

export default function _Children({ withFeedback, ...rest }: IChildren) {
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const size = useWindowSize();

  useEffect(() => {
    const element = ref.current;

    setIsEllipsisActive(
      element
        ? element.offsetWidth < element.scrollWidth ||
            element.offsetHeight < element.scrollHeight
        : false,
    );
  }, [size]);

  function verifyEllipsis() {
    if (rest.title) {
      return rest.title;
    }
    if (isEllipsisActive && typeof rest.children === 'string') {
      return rest.children;
    }
    return '';
  }

  if (!rest.children) {
    return null;
  }
  if (
    withFeedback?.loadingOptions.fullIcon &&
    withFeedback?.loadingOptions.isLoading
  ) {
    return null;
  }
  if (
    withFeedback?.successOptions?.fullIcon &&
    withFeedback?.successOptions.success
  ) {
    return null;
  }
  if (
    withFeedback?.failedOptions?.fullIcon &&
    withFeedback?.failedOptions.failed
  ) {
    return null;
  }
  return (
    <div
      {...showInDevelopment({ 'data-content': 'children' })}
      ref={ref}
      title={verifyEllipsis()}
      {...rest}
    />
  );
}
