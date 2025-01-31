import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router';

import { useRoutesMenu } from '~/hooks/useRoutesMenu';
import { useTranslation } from '~/hooks/useTranslation';

export function OtherComponents() {
  const { globalRoutes: options, triRoutes } = useRoutesMenu();
  const { translate } = useTranslation();

  if (!options.length || (triRoutes.next === null && triRoutes.prev === null)) {
    return null;
  }

  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-2">
      <p>{translate('OTHERS_COMPONENTS')}</p>
      <div className="flex justify-between items-center">
        <div>
          {triRoutes.prev && (
            <Link
              className="flex items-center justify-center hover:text-primary-700 transition-colors duration-500"
              to={triRoutes.prev.path}
            >
              <ArrowLeftIcon width="2rem" />
              <span>{triRoutes.prev.label}</span>
            </Link>
          )}
        </div>
        <div>
          {triRoutes.next && (
            <Link
              className="flex items-center justify-center hover:text-primary-700 transition-colors duration-500"
              to={triRoutes.next.path}
            >
              {triRoutes.next.label}
              <ArrowRightIcon width="2rem" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
