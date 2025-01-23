/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react';
import { useState } from 'react';
import { it, describe, expect, vi } from 'vitest';
import ErrorBoundary from '.';

function Mock1() {
	const [data, setData] = useState<{ id: string }[]>([{ id: 'Test Id' }]);
	return (
		<>
			{data[0].id}
			<button onClick={() => setData([])}>Force Error</button>
		</>
	);
}

function Mock() {
	return (
		<ErrorBoundary>
			<Mock1 />
		</ErrorBoundary>
	);
}

describe('Components/ErrorBoundary', () => {
	it(`must simulate error boundary`, () => {
		const { getByText } = render(<Mock />);
		expect(getByText('Test Id')).toBeInTheDocument();
		fireEvent.click(getByText('Force Error'));
		expect(getByText('Ocorreu um erro na aplicação')).toBeInTheDocument();
		fireEvent.click(getByText('Atualizar página'));
	});
});
