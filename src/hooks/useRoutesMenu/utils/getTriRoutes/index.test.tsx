/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { TRoutesMenu } from '~/types/TRoutesMenu';
import { TTriRoutes } from '../../types';
import { getTriRoutes } from '.';

function Mock() {
  return <div>Test</div>;
}

describe('hooks/useRoutesMenu/utils/getTriRoutes', () => {
  it(`should result next`, async () => {
    const first = {
      name: '1',
      path: 'test',
      implements_code: '1',
      docs_code: '1',
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: '1',
      hideTriRoutes: false,
      className: '1',
    };
    const second = {
      name: '2',
      path: '2',
      implements_code: '2',
      docs_code: '2',
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: '2',
      hideTriRoutes: false,
      className: '2',
    };
    const result = getTriRoutes([first, second], 'test');
    expect(result).toEqual({ actual: first, prev: null, next: second });
  });

  it(`should result prev`, async () => {
    const first = {
      name: '1',
      path: '1',
      implements_code: '1',
      docs_code: '1',
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: '1',
      hideTriRoutes: false,
      className: '1',
    };
    const second = {
      name: '2',
      path: 'test',
      implements_code: '2',
      docs_code: '2',
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: '2',
      hideTriRoutes: false,
      className: '2',
    };
    const result = getTriRoutes([first, second], 'test');
    expect(result).toEqual({ actual: second, prev: first, next: null });
  });

  it(`should result next children`, async () => {
    const childrens = [
      {
        name: 'children 1',
        path: 'test',
        implements_code: '1',
        docs_code: '1',
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: '1',
        hideTriRoutes: false,
        className: '1',
      },
      {
        name: 'children 2',
        path: 'test 2',
        implements_code: '1',
        docs_code: '1',
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: '1',
        hideTriRoutes: false,
        className: '1',
      },
    ];
    const first = {
      name: '1',
      path: '',
      implements_code: '1',
      docs_code: '1',
      element: <Mock />,
      demo: <Mock />,
      subs: childrens,
      expandedMenu: false,
      hideMenu: false,
      label: '1',
      hideTriRoutes: false,
      className: '1',
    };
    const second = {
      name: '2',
      path: '2',
      implements_code: '2',
      docs_code: '2',
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: '2',
      hideTriRoutes: false,
      className: '2',
    };
    const result = getTriRoutes([first, second], 'test');
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        actual: { ...childrens[0] },
        prev: { ...first },
        next: { ...childrens[1] },
      }),
    );
  });

  it(`should result next second children`, async () => {
    const childrens = [
      {
        name: 'children 1',
        path: '',
        implements_code: '1',
        docs_code: '1',
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: '1',
        hideTriRoutes: false,
        className: '1',
      },
      {
        name: 'children 2',
        path: 'test',
        implements_code: '1',
        docs_code: '1',
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: '1',
        hideTriRoutes: false,
        className: '1',
      },
    ];
    const first = {
      name: '1',
      path: '',
      implements_code: '1',
      docs_code: '1',
      element: <Mock />,
      demo: <Mock />,
      subs: childrens,
      expandedMenu: false,
      hideMenu: false,
      label: '1',
      hideTriRoutes: false,
      className: '1',
    };
    const second = {
      name: '2',
      path: '2',
      implements_code: '2',
      docs_code: '2',
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: '2',
      hideTriRoutes: false,
      className: '2',
    };
    const result = getTriRoutes([first, second], 'test');
    console.log({ result });
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        actual: { ...childrens[1] },
        prev: { ...childrens[0] },
        next: { ...second },
      }),
    );
  });

  it(`should result url root`, async () => {
    const result = getTriRoutes([], '/');
    expect(result).toEqual({
      actual: null,
      prev: null,
      next: null,
    });
  });
});
