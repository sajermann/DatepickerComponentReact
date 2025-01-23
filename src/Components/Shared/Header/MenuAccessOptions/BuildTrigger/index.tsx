import { Icons } from '~/Components/Shared/Icons';
import { TRoutesMenu } from '~/Types/TRoutesMenu';
import { _BuildNormalOption } from '../BuildNormalOption';

export function _BuildTrigger({
  isOpen,
  ...rest
}: { isOpen: boolean; onClick?: () => void } & TRoutesMenu) {
  const IS_OPEN: Record<string, React.ReactNode> = {
    true: <Icons nameIcon="arrowSingleDown" width="20" />,
    false: <Icons nameIcon="arrowSingleRight" width="20" />,
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-1">
        <_BuildNormalOption {...rest} />
      </div>
      <div className="w-10 p-2  flex items-center justify-center">
        {IS_OPEN[String(isOpen)]}
      </div>
    </div>
  );
}
