import { afterEach, describe, expect, it, vi } from 'vitest';
import { testIdOnlyDev } from '.';

describe('utils/testIdOnlyDev', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns testid object if import.meta.env.DEV is true', () => {
    vi.stubEnv('DEV', true);
    expect(testIdOnlyDev('test')).toEqual({ 'data-testid': 'test' });
  });

  it('returns empty object if import.meta.env.DEV is false', () => {
    vi.stubEnv('DEV', false);
    expect(testIdOnlyDev('test')).toEqual({});
  });

  it('returns empty object if import.meta.env.DEV is undefined', () => {
    vi.stubEnv('DEV', undefined as any);
    expect(testIdOnlyDev('test')).toEqual({});
  });
});
