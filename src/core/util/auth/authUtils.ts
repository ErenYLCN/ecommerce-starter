export async function isValidAdminPassword(password: string) {
  return await hashedPassword(password) === process.env.ADMIN_PASSWORD as string;
}

export async function hashedPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-512", data);

  return Buffer.from(hash).toString("base64");
}
