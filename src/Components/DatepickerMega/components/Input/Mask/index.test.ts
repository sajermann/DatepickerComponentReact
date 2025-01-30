/**
 * @vitest-environment jsdom
 */

import { it, describe, expect } from 'vitest';
import { mask } from '.';

describe('Utils/mask', () => {
	it(`should test real`, async () => {
		expect(
			mask.real({
				value: '12.00',
				decimalPlace: 2,
				thousandSeparator: '.',
				decimalSeparator: ',',
			})
		).toBe('R$ 12,00');

		expect(
			mask.real({
				value: null as unknown as string,
				decimalPlace: 2,
				thousandSeparator: '.',
				decimalSeparator: ',',
			})
		).toBe('R$ 0,00');
	});

	it(`should test cnpj`, async () => {
		expect(mask.cnpj('11111111111111')).toBe('11.111.111/1111-11');
		expect(mask.cnpj(null as unknown as string)).toBe('');
	});
	it(`should test cpf`, async () => {
		expect(mask.cpf('111111111111')).toBe('111.111.111-11');
		expect(mask.cpf(null as unknown as string)).toBe('');
	});

	it(`should test cep`, async () => {
		expect(mask.cep('11111111')).toBe('11111-111');
		expect(mask.cep(null as unknown as string)).toBe('');
	});

	it(`should test currency`, async () => {
		expect(mask.currency(12, 'pt-BR').toString()).toBe(
			new Intl.NumberFormat('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			}).format(12)
		);
	});
});
