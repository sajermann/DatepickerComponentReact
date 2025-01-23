import { Link } from 'react-router';

import { Icons } from '~/Components/Shared/Icons';
import { useRoutesMenu } from '~/Hooks/UseRoutesMenu';
import { useTranslation } from '~/Hooks/UseTranslation';
import { Main } from '../Main';

export function OtherComponents() {
  const { globalRoutes: options, triRoutes } = useRoutesMenu();
  const { translate } = useTranslation();

  if (!options.length || (triRoutes.next === null && triRoutes.prev === null)) {
    return null;
  }

  return (
    <Main heading={translate('OTHERS_COMPONENTS')}>
      <div className="flex justify-between items-center">
        <div>
          {triRoutes.prev && (
            <Link
              className="flex items-center justify-center hover:text-primary-700 transition-colors duration-500"
              to={triRoutes.prev.path}
            >
              <Icons nameIcon="arrowSingleLeft" width="2rem" />
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
              <Icons nameIcon="arrowSingleRight" width="2rem" />
            </Link>
          )}
        </div>
      </div>
    </Main>
  );
}
