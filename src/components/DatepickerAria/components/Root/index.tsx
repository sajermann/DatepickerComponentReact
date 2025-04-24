import { ReactNode } from 'react';
import { DatepickerMegaProvider } from '../../hooks';
import { Container } from '../Container';

type TProps = {
  defaultValue?: Date;
  value?: Date | null;
  onChange?: (data?: Date | null) => void;
  children: ReactNode;
};

export function Root({ children, ...rest }: TProps) {
  return (
    <DatepickerMegaProvider {...rest}>
      <Container>{children}</Container>
    </DatepickerMegaProvider>
  );
}
