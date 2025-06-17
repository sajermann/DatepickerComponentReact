/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as utils from "./hook";

import { InjectorProviders } from "~/components/InjectorProviders";
import { Playground } from ".";

describe("Pages/MonthPicker/components/Playground", () => {
  it(`must render checkbox`, async () => {
    const spy = vi.fn();
    vi.spyOn(utils, "usePlayGround").mockImplementation(
      () =>
        ({
          neccessaryReload: true,
          inputs: [],
          setShowCalendar: spy,
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
