/**
 * @vitest-environment jsdom
 */
import { render } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import { Version } from ".";

afterAll(() => {
  vi.unstubAllEnvs();
});

describe("components/InjectorProviders/Version", () => {
  it(`should show infos`, async () => {
    vi.stubEnv("DEV", false);
    const spy = vi.spyOn(console, "table");
    render(<Version />);

    expect(spy).not.toBeCalled();
  });
});
