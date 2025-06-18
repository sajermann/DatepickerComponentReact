/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InjectorProviders } from "~/components/InjectorProviders";
import { Home } from ".";

describe("pages/Home", () => {
  it(`must render component`, () => {
    const { getByText } = render(
      <InjectorProviders forTesting>
        <Home />
      </InjectorProviders>
    );
    expect(getByText(/welcome/i)).toBeInTheDocument();
  });
});
