import { NavLink } from 'react-router';
import { managerClassNames } from '~/utils/managerClassNames';
import { TMenuAccessOptionsProps } from '../types';

export function _BuildNormalOption({
  path,
  label,
  onClick,
  hideMenu,
}: TMenuAccessOptionsProps) {
  if (hideMenu) return null;
  return (
    <li>
      <NavLink
        onClick={onClick}
        key={`${label}-${path}`} // Não lembro pq coloquei a key nesse cara, mas lembro que era importante
        to={path}
        className={({ isActive }) =>
          managerClassNames([
            { 'w-[90%] flex p-2 hover:text-violet-700': true },
            { 'transition-colors duration-300': true },
            { 'border-2 border-x-0 border-t-0 border-violet-700': isActive },
            { 'text-violet-700': isActive },
          ])
        }
        end
      >
        {label}
      </NavLink>
    </li>
  );
}
