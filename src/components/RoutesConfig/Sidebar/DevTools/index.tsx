import {
  Check,
  Copy,
  ExternalLink,
  FileCode,
  FlaskConical,
} from 'lucide-react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useTranslation } from '~/hooks';
import { getEditorUrl, managerClassNames } from '~/utils';
import { useFileCoverage } from './hooks/useFileCoverage';
import { resolveRouteToFile } from './utils/resolveRouteToFile';

export function DevTools() {
  const { translate } = useTranslation();
  const { pathname } = useLocation();
  const fileInfo = resolveRouteToFile(pathname);
  const { coverage } = useFileCoverage(fileInfo?.filePath);
  const [copied, setCopied] = useState(false);

  if (!fileInfo || !import.meta.env.DEV) {
    return null;
  }

  const editorUrl = getEditorUrl(fileInfo.filePath);
  const testEditorUrl = getEditorUrl(fileInfo.testPath);
  const testCommand = `npm test -- ${fileInfo.testPath}`;

  const handleCopyTestCommand = async () => {
    try {
      await navigator.clipboard.writeText(testCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar comando:', err);
    }
  };

  const renderCoverageBadge = () => {
    if (!coverage) {
      return (
        <span
          title="Rode os testes com coverage (npm test) para gerar dados"
          className="px-2 py-0.5 text-xs rounded-md bg-neutral-500/10 text-neutral-400 border border-neutral-500/20 font-mono"
        >
          Cov: N/A
        </span>
      );
    }

    const { pct } = coverage;
    let colorClasses = 'bg-red-500/10 text-red-500 border-red-500/20';

    if (pct >= 90) {
      colorClasses = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    } else if (pct >= 70) {
      colorClasses = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }

    return (
      <span
        title={`${coverage.covered}/${coverage.total} linhas cobertas (${pct}%)`}
        className={`px-2 py-0.5 text-xs rounded-md border font-mono font-medium ${colorClasses}`}
      >
        Cov: {pct}%
      </span>
    );
  };

  return (
    <main className="border rounded-2xl p-5 text-sm flex flex-col gap-3 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b pb-2">
        <span className="font-semibold text-xs tracking-wider uppercase opacity-80 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          {translate('DEV_TOOLS')}
        </span>

        <div className="flex items-center gap-1.5">{renderCoverageBadge()}</div>
      </div>

      <div className="flex flex-col gap-2">
        {editorUrl && (
          <a
            href={editorUrl}
            className={managerClassNames([
              'flex items-center justify-between gap-2 p-2 rounded-lg border',
              'text-xs hover:opacity-70 transition-all duration-300',
            ])}
            title={`${translate('OPEN_FILE')} ${fileInfo.filePath}`}
          >
            <div className="flex items-center gap-2 truncate">
              <FileCode className="w-4 h-4 text-sky-500 shrink-0" />
              <span className="truncate">{translate('OPEN_FILE')}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
          </a>
        )}

        {testEditorUrl && (
          <a
            href={testEditorUrl}
            className={managerClassNames([
              'flex items-center justify-between gap-2 p-2 rounded-lg border',
              'text-xs hover:opacity-70 transition-all duration-300',
            ])}
            title={`${translate('OPEN_TEST')} ${fileInfo.testPath}`}
          >
            <div className="flex items-center gap-2 truncate">
              <FlaskConical className="w-4 h-4 text-purple-500 shrink-0" />
              <span className="truncate">{translate('OPEN_TEST')}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60 shrink-0" />
          </a>
        )}

        <button
          type="button"
          onClick={handleCopyTestCommand}
          className={managerClassNames([
            'flex items-center justify-between gap-2 p-2 rounded-lg border',
            'text-xs hover:opacity-70 transition-all duration-300',
          ])}
          title={`${translate('COPIED_TO_CLIPBOARD')}: ${testCommand}`}
        >
          <div className="flex items-center gap-2 truncate">
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
            ) : (
              <Copy className="w-4 h-4 text-amber-500 shrink-0" />
            )}
            <span className="truncate font-mono">
              {copied ? translate('COPIED_TO_CLIPBOARD') : testCommand}
            </span>
          </div>
        </button>
      </div>
    </main>
  );
}
