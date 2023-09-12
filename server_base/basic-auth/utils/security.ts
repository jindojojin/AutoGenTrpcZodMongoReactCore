import {createHash} from "crypto";
import {sign, verify} from "jsonwebtoken";

export function createJWT<T extends object>(
  user: T,
  expiresIn: string = "24h",
) {
  return sign(user, process.env.SECRET_KEY || "secretabc", {
    expiresIn, // Thời hạn 1 ngày từ khi tạo
  });
}

export function verifyJWT<T extends object>(token: string | undefined) {
  if (!token) return null;
  try {
    return verify(token, process.env.SECRET_KEY || "secretabc") as T | null;
  } catch (e) {
    return null;
  }
}

export function md5(text: string) {
  return createHash("md5").update(text).digest("hex");
}

export function generateRandomPassword(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }

  return password;
}