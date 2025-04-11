export const parseJSONWithoutError = (v: string | unknown): string | Record<string, unknown> => {
  if (v === null || v === undefined) {
    return '';
  }

  if (typeof v === 'string') {
    try {
      const json = JSON.parse(v);
      return typeof json === 'object' && json !== null ? json : String(json);
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      return v;
    }
  }

  // Return record as record and convert other values to string
  return typeof v === 'object' && !Array.isArray(v) ? (v as Record<string, unknown>) : String(v);
};
