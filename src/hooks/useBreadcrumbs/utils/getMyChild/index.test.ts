import { describe, expect, it } from 'vitest';
import { TRoutesMenu } from '~/types/TRoutesMenu';
import { _getMyChild } from './index';

describe('hooks/useBreadcrumbs/utils/getMyChild', () => {
  const routes: any = [
    {
      name: 'Root',
      path: '/',
      subs: [
        {
          name: 'DayPicker',
          path: '/day-picker',
        },
        {
          name: 'Settings',
          path: '/settings',
          subs: [
            {
              name: 'Profile',
              path: '/settings/profile',
            },
          ],
        },
      ],
    },
    {
      name: 'NoSubs',
      path: '/nosubs',
    },
  ];

  it('should find immediate child route matching path', () => {
    const child = _getMyChild(routes, 'day-picker');
    expect(child).not.toBeNull();
    expect(child?.name).toBe('DayPicker');
  });

  it('should find deeply nested route matching path', () => {
    const child = _getMyChild(routes, 'settings/profile');
    expect(child).not.toBeNull();
    expect(child?.name).toBe('Profile');
  });

  it('should return null when route is not found', () => {
    const child = _getMyChild(routes, 'non-existing');
    expect(child).toBeNull();
  });
});
