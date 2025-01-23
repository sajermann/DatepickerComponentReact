import { Button } from '~/Components/Shared/Button';
import { ComponentBlock } from '~/Components/Shared/ComponentBlock';

import { Main } from '~/Components/Shared/Main';
import { Section } from '~/Components/Shared/Section';

import { useTranslation } from '~/Hooks/UseTranslation';

export function DemoPage() {
  const { translate } = useTranslation();

  return (
    <Main>
      <Section title={translate('DEMO')} variant="h1">
        {translate('DESCRIPTION')}
      </Section>

      <Section title={translate('SECTION')} variant="h2">
        <ComponentBlock>{translate('SECTION_DEMO')}</ComponentBlock>
      </Section>
    </Main>
  );
}
