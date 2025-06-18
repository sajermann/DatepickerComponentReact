export function capitalize<T>(data?: T): T {
  if (typeof data === 'string') {
    return (data.charAt(0).toUpperCase() + data.slice(1)) as T;
  }
  return data as T;
}
