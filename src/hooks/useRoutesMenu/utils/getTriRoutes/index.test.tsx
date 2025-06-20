/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { TRoutesMenu } from "~/types/TRoutesMenu";
import { getTriRoutes } from ".";
import { TTriRoutes } from "../../types";

function Mock() {
  return <div>Test</div>;
}

describe("hooks/useRoutesMenu/utils/getTriRoutes", () => {
  it(`should result next`, async () => {
    const first = {
      name: "1",
      path: "test",
      implements_code: "1",
      docs_code: "1",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "1",
      hideTriRoutes: false,
      className: "1",
    };
    const second = {
      name: "2",
      path: "2",
      implements_code: "2",
      docs_code: "2",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "2",
      hideTriRoutes: false,
      className: "2",
    };
    const result = getTriRoutes([first, second], "test");
    expect(result).toEqual({ actual: first, prev: null, next: second });
  });

  it(`should result prev`, async () => {
    const first = {
      name: "1",
      path: "1",
      implements_code: "1",
      docs_code: "1",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "1",
      hideTriRoutes: false,
      className: "1",
    };
    const second = {
      name: "2",
      path: "test",
      implements_code: "2",
      docs_code: "2",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "2",
      hideTriRoutes: false,
      className: "2",
    };
    const result = getTriRoutes([first, second], "test");
    expect(result).toEqual({ actual: second, prev: first, next: null });
  });

  it(`should result next children`, async () => {
    const childrens = [
      {
        name: "children 1",
        path: "test",
        implements_code: "1",
        docs_code: "1",
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: "1",
        hideTriRoutes: false,
        className: "1",
      },
      {
        name: "children 2",
        path: "test 2",
        implements_code: "1",
        docs_code: "1",
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: "1",
        hideTriRoutes: false,
        className: "1",
      },
    ];
    const first = {
      name: "1",
      path: "",
      implements_code: "1",
      docs_code: "1",
      element: <Mock />,
      demo: <Mock />,
      subs: childrens,
      expandedMenu: false,
      hideMenu: false,
      label: "1",
      hideTriRoutes: false,
      className: "1",
    };
    const second = {
      name: "2",
      path: "2",
      implements_code: "2",
      docs_code: "2",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "2",
      hideTriRoutes: false,
      className: "2",
    };
    const result = getTriRoutes([first, second], "test");
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        actual: { ...childrens[0] },
        prev: { ...first },
        next: { ...childrens[1] },
      })
    );
  });

  it(`should result next second children`, async () => {
    const childrens = [
      {
        name: "children 1",
        path: "",
        implements_code: "1",
        docs_code: "1",
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: "1",
        hideTriRoutes: false,
        className: "1",
      },
      {
        name: "children 2",
        path: "test",
        implements_code: "1",
        docs_code: "1",
        element: <Mock />,
        demo: <Mock />,
        subs: [],
        expandedMenu: false,
        hideMenu: false,
        label: "1",
        hideTriRoutes: false,
        className: "1",
      },
    ];
    const first = {
      name: "1",
      path: "",
      implements_code: "1",
      docs_code: "1",
      element: <Mock />,
      demo: <Mock />,
      subs: childrens,
      expandedMenu: false,
      hideMenu: false,
      label: "1",
      hideTriRoutes: false,
      className: "1",
    };
    const second = {
      name: "2",
      path: "2",
      implements_code: "2",
      docs_code: "2",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "2",
      hideTriRoutes: false,
      className: "2",
    };
    const result = getTriRoutes([first, second], "test");
    console.log({ result });
    expect(JSON.stringify(result)).toBe(
      JSON.stringify({
        actual: { ...childrens[1] },
        prev: { ...childrens[0] },
        next: { ...second },
      })
    );
  });

  it.skip(`should result next hide tri route correctly`, async () => {
    const first: TRoutesMenu = {
      name: "1",
      path: "test-1",
      element: <Mock />,
      subs: [],
      expandedMenu: false,
      label: "1",
      className: "1",
    };
    const second: TRoutesMenu = {
      name: "2",
      path: "test-2",
      element: <Mock />,
      subs: [],
      expandedMenu: false,
      label: "2",
      className: "2",
      hide: {
        menu: true,
      },
    };
    const thirty: TRoutesMenu = {
      name: "3",
      path: "test-3",
      element: <Mock />,
      subs: [],
      expandedMenu: false,
      label: "3",
      className: "3",
    };
    const fourty: TRoutesMenu = {
      name: "4",
      path: "test-4",
      element: <Mock />,
      subs: [],
      expandedMenu: false,
      label: "4",
      className: "4",
    };
    const result = getTriRoutes([first, second, thirty, fourty], "test-1");
    expect(result).toEqual({ actual: first, prev: null, next: fourty });
  });

  it.skip(`should result prev hide tri route correctly`, async () => {
    const first = {
      name: "1",
      path: "1",
      implements_code: "1",
      docs_code: "1",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "1",
      hideTriRoutes: false,
      className: "1",
    };
    const second = {
      name: "2",
      path: "2",
      implements_code: "2",
      docs_code: "2",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "2",
      hideTriRoutes: true,
      className: "2",
    };
    const thirty = {
      name: "3",
      path: "3",
      implements_code: "3",
      docs_code: "3",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "3",
      hideTriRoutes: true,
      className: "3",
    };
    const fourty = {
      name: "4",
      path: "test",
      implements_code: "4",
      docs_code: "4",
      element: <Mock />,
      demo: <Mock />,
      subs: [],
      expandedMenu: false,
      hideMenu: false,
      label: "4",
      hideTriRoutes: false,
      className: "4",
    };
    const result = getTriRoutes([first, second, thirty, fourty], "test");
    expect(result).toEqual({ actual: fourty, prev: first, next: null });
  });

  it(`should result url root`, async () => {
    const result = getTriRoutes([], "/");
    expect(result).toEqual({
      actual: null,
      prev: null,
      next: null,
    });
  });
});
