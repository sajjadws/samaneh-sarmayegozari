import { hashPassword } from "better-auth/crypto";

const hash = await hashPassword("123456789");

console.log("\n\n\n" + hash);