/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FeedbackIcon from '.';

describe('Components/Button/FeedbackIcon', () => {
  it(`should render FeedbackIcon all path`, async () => {
    render(<FeedbackIcon />);
    render(
      <FeedbackIcon
        withFeedback={{
          successOptions: {
            success: true,
          },
          loadingOptions: {
            isLoading: false,
          },
        }}
      />,
    );
    render(
      <FeedbackIcon
        withFeedback={{
          loadingOptions: {
            isLoading: true,
          },
        }}
      />,
    );
    const { getByText } = render(
      <FeedbackIcon
        withFeedback={{
          loadingOptions: {
            isLoading: false,
          },
          successOptions: {
            success: true,
            customIcon: <div>Success</div>,
          },
        }}
      />,
    );
    expect(getByText('Success')).toBeInTheDocument();
    render(
      <FeedbackIcon
        withFeedback={{
          failedOptions: {
            failed: true,
          },
          loadingOptions: {
            isLoading: false,
          },
        }}
      />,
    );
    const result = render(
      <FeedbackIcon
        withFeedback={{
          failedOptions: {
            failed: true,
            customIcon: <div>Failed</div>,
          },
          loadingOptions: {
            isLoading: false,
          },
        }}
      />,
    );
    expect(result.getByText('Failed')).toBeInTheDocument();
  });
});
