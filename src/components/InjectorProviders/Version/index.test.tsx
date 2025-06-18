/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from "vitest";

import { Version } from ".";

describe("components/InjectorProviders/Version", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it('calls console.table when MODE is "production"', () => {
    vi.stubEnv("VITE_MODE", "production");
    vi.stubEnv("VITE_DEPLOY_TIME", "2025-06-17T01:29:39.346Z");
    vi.stubEnv("VITE_COMMIT_HASH", "abcdef123456");
    vi.stubEnv("VITE_COMMIT_SHORT_HASH", "abcdef1");
    vi.stubEnv("VITE_COMMIT_MESSAGE", "fix: something important");
    vi.stubEnv("VITE_COMMIT_AUTHOR", "dev");
    vi.stubEnv("VITE_BRANCH_NAME", "main");
    vi.stubEnv("VITE_LAST_COMMIT_DATE", "2025-06-16");
    vi.stubEnv("VITE_TOTAL_COMMITS", "42");

    const tableSpy = vi.spyOn(console, "table").mockImplementation(() => {});

    Version();

    expect(tableSpy).toHaveBeenCalledWith({
      DEPLOY_TIME: "2025-06-17T01:29:39.346Z",
      COMMIT_HASH: "abcdef123456",
      COMMIT_SHORT_HASH: "abcdef1",
      COMMIT_MESSAGE: "fix: something important",
      COMMIT_AUTHOR: "dev",
      BRANCH_NAME: "main",
      LAST_COMMIT_DATE: "2025-06-16",
      TOTAL_COMMITS: "42",
    });
  });

  it('does not call console.table when MODE is not "production"', () => {
    vi.stubEnv("VITE_MODE", "development");
    const tableSpy = vi.spyOn(console, "table").mockImplementation(() => {});

    Version();

    expect(tableSpy).not.toHaveBeenCalled();
  });

  it("always returns null", () => {
    expect(Version()).toBeNull();
  });
});
