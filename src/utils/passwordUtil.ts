import CryptoJS from "crypto-js";

// 암호화 키
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// 비밀번호 암호화 함수
export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

// 비밀번호 검증 함수
export const decryptPassword = (encryptedPassword: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// 비밀번호 비교 함수
export const comparePassword = (
  inputPassword: string,
  encryptedPassword: string
): boolean => {
  const decryptedPassword = decryptPassword(encryptedPassword);
  return inputPassword === decryptedPassword;
};
