export function getString(val: any): string {
  if (typeof val === "string") {
    return val;
  }

  return "";
}
