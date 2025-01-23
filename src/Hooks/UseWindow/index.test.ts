import { renderHook } from '@testing-library/react';
import { it, describe, expect } from 'vitest';

import { useWindow } from '.';

describe('Hooks/UseWindow', () => {
	it(`must render data`, async () => {
		const { result } = renderHook(() => useWindow());
		expect(result.current.view).toEqual({ width: 1024, height: 768 });
	});
});
