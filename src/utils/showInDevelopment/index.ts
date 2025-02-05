export function showInDevelopment(obj: { [i: string]: string }): object {
	if (!import.meta.env.DEV) return {};
	return obj;
}

export function testIdOnlyDev(testid: string): object {
	if (!import.meta.env.DEV) return {};
	return { 'data-testid': testid };
}
