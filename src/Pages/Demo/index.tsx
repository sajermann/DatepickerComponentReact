import { Section } from '~/components/Section';

import { useTranslation } from '~/hooks/useTranslation';

export function DemoPage() {
  const { translate } = useTranslation();

  return (
    <main className="h-full gap-2 flex flex-col">
      <Section title={translate('DEMO')} variant="h1">
        {translate('DESCRIPTION')}
      </Section>

      <Section title={translate('SECTION')} variant="h2">
        {translate('SECTION_DEMO')}
      </Section>
    </main>
  );
}
