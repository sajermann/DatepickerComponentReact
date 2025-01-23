export function managerOverflowBody(
	shouldHiddenOverflow: boolean,
	body: HTMLBodyElement | null
) {
	const bodyInternal = body;
	if (shouldHiddenOverflow) {
		if (bodyInternal) {
			bodyInternal.style.overflow = 'hidden';
		}
	} else if (bodyInternal) {
		bodyInternal.style.overflow = '';
	}
}
