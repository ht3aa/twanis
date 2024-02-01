export function parseJwt(token: string | undefined) {
  if (!token) {
    return;
  }

  const payload = token.split(".")[1];
  const base64 = payload.replace("-", "+").replace("_", "/");
  return JSON.parse(Buffer.from(base64, "base64").toString());
}
