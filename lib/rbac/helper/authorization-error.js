export class AuthorizationError extends Error {
  constructor(message, status = 403) {
    super(message);
    this.name = "AuthorizationError";
    this.status = status;
    this.code = status === 401 ? "UNAUTHORIZED" : "FORBIDDEN";
  }
}
export function unauthorized() { return new AuthorizationError("UNAUTHORIZED", 401); }
export function forbidden() { return new AuthorizationError("FORBIDDEN", 403); }
export function authorizationResult(error) {
  const status = error instanceof AuthorizationError ? error.status : error?.status;
  if (status === 401) return { ok: false, status: 401, code: "UNAUTHORIZED", message: "برای ادامه ابتدا وارد حساب کاربری شوید." };
  if (status === 403) return { ok: false, status: 403, code: "FORBIDDEN", message: "شما مجوز انجام این عملیات را ندارید." };
  return null;
}
