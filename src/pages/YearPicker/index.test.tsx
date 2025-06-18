/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components/InjectorProviders";
import { YearPickerPage } from ".";

describe("Pages/YearPickerPage", () => {
  it(`must render checkbox`, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <YearPickerPage />
      </InjectorProviders>
    );
  });
});
