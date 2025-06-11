import { HashRouter } from "react-router";
import { BreadcrumbsProvider } from "~/hooks/useBreadcrumbs";
import { FontSizeProvider } from "~/hooks/useFontSize";
import { Config } from "./Config";
import { Version } from "./Version";
import "~/config/i18n";

export function InjectorProviders({
  children,
  forTesting,
}: {
  children: React.ReactNode;
  forTesting?: boolean;
}) {
  if (forTesting) {
    return <HashRouter>{children}</HashRouter>;
  }
  return (
    <HashRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          <Version />
          <Config />
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </HashRouter>
  );
}
