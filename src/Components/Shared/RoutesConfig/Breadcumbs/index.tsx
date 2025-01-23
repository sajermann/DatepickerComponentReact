import { Link, useLocation } from 'react-router';
import { useBreadcrumbs } from '~/Hooks/UseBreadcrumbs';

export default function _Breadcrumbs() {
  const { breadcrumbs } = useBreadcrumbs();
  const location = useLocation();

  if (!breadcrumbs || location.pathname === '/') {
    return null;
  }

  return (
    <div className="flex gap-1 !text-primary-500">
      {breadcrumbs.map((item, index) =>
        item.link && breadcrumbs[index + 1] ? (
          <ol key={`${item.link}-${breadcrumbs[index + 1]}`}>
            <Link to={item.link} className="hover:underline !text-primary-500">
              {item.label}
            </Link>
            {breadcrumbs[index + 1].label && ' / '}
          </ol>
        ) : (
          <ol key={`${item.label}-${index}`}>{item.label}</ol>
        ),
      )}
    </div>
  );
}
