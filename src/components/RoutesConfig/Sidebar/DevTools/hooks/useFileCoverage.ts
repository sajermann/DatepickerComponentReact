import { useEffect, useState } from 'react';

interface CoverageData {
  pct: number;
  covered: number;
  total: number;
}

export function useFileCoverage(filePath: string | undefined) {
  const [coverage, setCoverage] = useState<CoverageData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filePath || !import.meta.env.DEV) {
      setCoverage(null);
      return;
    }

    let isMounted = true;
    setLoading(true);

    fetch('/__coverage-summary')
      .then(res => {
        if (!res.ok) throw new Error('Coverage not found');
        return res.json();
      })
      .then(data => {
        if (!isMounted) return;

        // Normaliza para achar a chave que termina com o filePath
        // Ex: data['E:/.../src/pages/TraditionalPattern/ColumnOrder/index.tsx']
        const normalizedTarget = filePath.replace(/\\/g, '/');
        const matchedKey = Object.keys(data).find(key =>
          key.replace(/\\/g, '/').endsWith(normalizedTarget),
        );

        if (matchedKey && data[matchedKey]?.lines) {
          const lines = data[matchedKey].lines;
          setCoverage({
            pct: lines.pct ?? 0,
            covered: lines.covered ?? 0,
            total: lines.total ?? 0,
          });
        } else {
          setCoverage(null);
        }
      })
      .catch(() => {
        if (isMounted) setCoverage(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [filePath]);

  return { coverage, loading };
}
