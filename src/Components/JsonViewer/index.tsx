import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
import { lightTheme } from '@uiw/react-json-view/light';
import { useDarkMode } from '~/hooks/useDarkMode';

interface JsonViewerProps {
  value?: object;
  collapsed?: boolean | number;
  shortenTextAfterLength?: number;
}

export function JsonViewer(data: JsonViewerProps) {
  const { darkMode } = useDarkMode();
  const theme = darkMode ? { ...darkTheme } : { ...lightTheme };
  return <JsonView {...data} style={{ ...theme, width: '100%' }} />;
}
