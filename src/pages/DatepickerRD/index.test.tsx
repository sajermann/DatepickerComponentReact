/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components/InjectorProviders";

import { DatePickerRDPage } from ".";

describe("Pages/DatePickerRDPage", () => {
  it(`must render DatePickerRDPage`, async () => {
    render(
      <InjectorProviders>
        <DatePickerRDPage />
      </InjectorProviders>
    );
  });
});
