/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { TRoutesMenu } from '~/types/TRoutesMenu';
import { _sortCustomName, _sortCustomOrder } from '.';

describe('Hooks/use/Routes/Menu/Utils/sortCustom', () => {
  it(`should sort`, async () => {
    const result: TRoutesMenu[] = [
      {
        name: 'Home',
        path: '/',
        element: <></>,
        label: 'Home',
        hideTriRoutes: true,
        order: 0,
      },
      {
        name: 'Datepicker Mega',
        path: '/datepicker-mega',
        description: 'Datepicker Mega',
        element: <></>,
        label: 'Datepicker Mega',
      },
      {
        name: 'Cegundo',
        path: '/datepicker-mega',
        description: 'Cegundo',
        element: <></>,
        label: 'Cegundo',
        order: 2,
      },
      {
        name: 'Primeiro',
        path: '/datepicker-mega',
        description: 'Primeiro',
        element: <></>,
        label: 'Primeiro',
        order: 1,
      },
      {
        name: 'Zero',
        path: '/datepicker-mega',
        description: 'Zero',
        element: <></>,
        label: 'Zero',
        order: 0,
      },
      {
        name: 'NotFound',
        path: '*',
        element: <></>,
        label: 'Not Found',
        hideTriRoutes: true,
        hideMenu: true,
      },
    ]
      .sort(_sortCustomName)
      .sort(_sortCustomOrder);

    expect(result[0].name).toBe('Home');
    expect(result[1].name).toBe('Zero');
    expect(result[2].name).toBe('Primeiro');
    expect(result[3].name).toBe('Cegundo');
    expect(result[4].name).toBe('Datepicker Mega');
  });
});
