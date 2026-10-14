import { afterEach, describe, expect, it, vi } from "vitest";
import { getEditorUrl } from ".";

describe("utils/getEditorUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("should return undefined when not in DEV mode", () => {
    vi.stubEnv("DEV", false);
    expect(getEditorUrl("src/components/Button/index.tsx")).toBeUndefined();
  });

  it("should return correct editor URL when path includes src/", () => {
    vi.stubEnv("DEV", true);
    vi.stubEnv("VITE_PROJECT_ROOT", "/project/root");

    const url = getEditorUrl("http://localhost:3000/src/components/Button/index.tsx?t=123", 42);
    expect(url).toBe("antigravity-ide://file//project/root/src/components/Button/index.tsx:42");
  });

  it("should return correct editor URL when path does not include src/", () => {
    vi.stubEnv("DEV", true);
    vi.stubEnv("VITE_PROJECT_ROOT", "/project/root");

    const url = getEditorUrl("/components/Button/index.tsx");
    expect(url).toBe("antigravity-ide://file//project/root/components/Button/index.tsx:1");
  });
});
