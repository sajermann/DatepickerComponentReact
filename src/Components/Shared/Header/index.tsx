import { Link } from 'react-router';

import { Nav } from '../Nav';
import { _MenuAccessOptionsMobile } from './MenuAccessOptionsMobile';
import MenuSettings from './MenuSettings';

const HOME_NAME = import.meta.env.VITE_APPLICATION_HOME_NAME;

export function Header() {
  return (
    <Nav className="backdrop-blur-md z-50 sticky top-0">
      <div className="w-full flex flex-wrap justify-between items-center mx-auto">
        <_MenuAccessOptionsMobile />
        <Link to="/" className="flex items-center">
          <h1 className="text-xl whitespace-nowrap font-bold">{HOME_NAME}</h1>
        </Link>
        <MenuSettings />
      </div>
    </Nav>
  );
}
