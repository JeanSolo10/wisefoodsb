import crypto, { JsonWebKey, Encoding } from "crypto";

export const hashToken = (token: Encoding): any => {
  return crypto.createHash("sha512").update(token).digest("hex");
};
