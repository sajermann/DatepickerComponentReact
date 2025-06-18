type AllowedValue = string | boolean | number;

function isAllowedValue(value: unknown): value is AllowedValue {
  return (
    typeof value === 'string' ||
    typeof value === 'boolean' ||
    typeof value === 'number'
  );
}

function camelToKebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

export function getDataAttributes<T extends Record<string, unknown>>(
  obj: T,
): Record<string, AllowedValue> {
  const dataAttrs: Record<string, AllowedValue> = {};

  Object.entries(obj).forEach(([key, value]) => {
    if (isAllowedValue(value)) {
      dataAttrs[`data-${camelToKebab(key)}`] = value;
    }
  });

  return dataAttrs;
}
