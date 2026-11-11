export class AuthorizationError extends Error {
	constructor(message, status = 403) {
		super(message);

		this.name = "AuthorizationError";
		this.status = status;
	}
}

export function unauthorized() {
	return new AuthorizationError("UNAUTHORIZED", 401);
}

export function forbidden() {
	return new AuthorizationError("FORBIDDEN", 403);
}
