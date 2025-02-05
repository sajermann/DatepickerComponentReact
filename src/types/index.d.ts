import '@tanstack/react-table';

export {};

declare global {
	interface Window {
		store: UseBoundStore<Write<StoreApi<Props>, StorePersist<Props, Props>>>;
	}
}

declare module '@tanstack/table-core' {
	interface ColumnMeta {
		align?: TextAlign;
		filterElement?: (data: any, dataB: any) => React.ReactNode;
		cellEdit?: (data: any) => React.ReactNode;
	}
}
