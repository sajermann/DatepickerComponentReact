import { afterEach, describe, expect, it, vi } from 'vitest';
import { showInDevelopment } from './';

describe('utils/showInDevelopment', () => {
  const obj = { foo: 'bar', baz: 'qux' };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the object if import.meta.env.DEV is true', () => {
    vi.stubEnv('DEV', true);
    expect(showInDevelopment(obj)).toEqual(obj);
  });

  it('returns the object if import.meta.env.DEV is false', () => {
    vi.stubEnv('DEV', false);
    expect(showInDevelopment(obj)).toEqual({});
  });

  it('returns the object if import.meta.env.DEV is undefined', () => {
    vi.stubEnv('DEV', undefined as any);
    expect(showInDevelopment(obj)).toEqual({});
  });
});
