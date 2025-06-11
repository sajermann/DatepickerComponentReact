/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components/InjectorProviders";

import { DayPicker } from ".";

describe("packages/DayPicker", () => {
  it(`must render DayPicker`, async () => {
    render(
      <InjectorProviders>
        <DayPicker />
      </InjectorProviders>
    );
  });
});
