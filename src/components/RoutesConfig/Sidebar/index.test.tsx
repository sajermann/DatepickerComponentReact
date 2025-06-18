/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as utils from "~/hooks/useHomePage";
import { _Sidebar } from ".";
import { InjectorProviders } from "../../InjectorProviders";

describe("components/RoutesConfig/_Sidebar", () => {
  it(`should render component`, async () => {
    vi.spyOn(utils, "useHomePage").mockReturnValue({
      isHomePage: true,
    });
    const { queryByTestId } = render(
      <InjectorProviders>
        <_Sidebar />
      </InjectorProviders>
    );

    expect(queryByTestId("aside-sidebar")).not.toBeTruthy();
  });
  it(`should render component`, async () => {
    vi.spyOn(utils, "useHomePage").mockReturnValue({
      isHomePage: false,
    });
    const { queryByTestId } = render(
      <InjectorProviders>
        <_Sidebar />
      </InjectorProviders>
    );

    expect(queryByTestId("aside-sidebar")).toBeTruthy();
  });
});
