/** Serialize JSON-LD safely for embedding inside an HTML script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
