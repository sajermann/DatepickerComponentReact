/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as utils from "./hook";

import { InjectorProviders } from "~/components/InjectorProviders";
import { Playground } from ".";

describe("pages/MonthPicker/components/Playground", () => {
  it(`must render component`, async () => {
    const spy = vi.fn();
    vi.spyOn(utils, "usePlayGround").mockImplementation(
      () =>
        ({
          neccessaryReload: true,
          inputs: [],
          onReloadAction: spy,
        } as any)
    );
    const { getByText } = render(
      <InjectorProviders forTesting>
        <Playground />
      </InjectorProviders>
    );
    const button = getByText("Reload");
    fireEvent.click(button);
    expect(spy).toBeCalled();
  });
});
