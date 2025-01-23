/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import { afterEach, beforeEach, vi } from 'vitest';

import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

const intersectionObserverMock = () => ({
  observe: () => null,
  disconnect: () => null,
  unobserve: () => null,
});
window.IntersectionObserver = vi
  .fn()
  .mockImplementation(intersectionObserverMock);

beforeEach(() => {
  global.URL.createObjectURL = vi.fn();
  global.URL.revokeObjectURL = vi.fn();
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Object.defineProperty(window, 'innerWidth', {
  // 	writable: true,
  // 	configurable: true,
  // 	value: 1280,
  // });
  // Object.defineProperty(window, 'innerHeight', {
  // 	writable: true,
  // 	configurable: true,
  // 	value: 720,
  // });
});
