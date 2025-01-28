import { ComponentBlock } from '~/components/shared/ComponentBlock';

import { Main } from '~/components/shared/Main';
import { Section } from '~/components/shared/Section';

import { useTranslation } from '~/hooks/useTranslation';

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
