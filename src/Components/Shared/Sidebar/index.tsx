import { testIdOnlyDev } from '~/Utils/ShowInDevelopment';
import Credits from './Credits';
import { OtherComponents } from './OtherComponents';
import { TableOfContents } from './TableOfContents';

export function Sidebar() {
	return (
		<aside
			{...testIdOnlyDev('aside-sidebar')}
			className="flex flex-col w-full gap-3 max-h-full sticky top-20 self-start overflow-y-auto"
		>
			<TableOfContents />
			<OtherComponents />
			<Credits />
		</aside>
	);
}
