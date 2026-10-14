export const getEditorUrl = (fileOrUrl: string, line = 1) => {
  if (!import.meta.env.DEV) return undefined;

  const root = import.meta.env.VITE_PROJECT_ROOT;

  const clean = fileOrUrl.split('?')[0];
  const srcIndex = clean.indexOf('src/');
  const relativePath =
    srcIndex !== -1 ? clean.slice(srcIndex) : clean.replace(/^\//, '');

  return `antigravity-ide://file/${root}/${relativePath}:${line}`;
};
