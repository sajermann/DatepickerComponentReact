import clsx, { ClassValue } from 'clsx';

export function managerClassNames(...inputs: ClassValue[]): string {
	return clsx(...inputs);
}
