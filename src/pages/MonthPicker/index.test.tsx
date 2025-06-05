/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, it } from "vitest";

import { InjectorProviders } from "~/components/InjectorProviders";
import { MonthPickerPage } from ".";

describe("Pages/MonthPickerPage", () => {
  it(`must render checkbox`, async () => {
    const { getAllByText } = render(
      <InjectorProviders>
        <MonthPickerPage />
      </InjectorProviders>
    );
  });
});
