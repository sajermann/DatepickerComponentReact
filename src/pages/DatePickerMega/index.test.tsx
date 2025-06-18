/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { InjectorProviders } from "~/components/InjectorProviders";

import { DatePickerMegaPage } from ".";

describe("Pages/DatePickerMegaPage", () => {
  it(`must render DatePickerMegaPage`, async () => {
    render(
      <InjectorProviders>
        <DatePickerMegaPage />
      </InjectorProviders>
    );
  });
});
