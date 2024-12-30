import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { comparePassword } from "../utils/passwordUtil";

// 비밀번호 확인 함수
export const checkPassword = async (docId: string, inputPassword: string) => {
  try {
    const docRef = doc(db, "guestCards", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const isPasswordCorrect = comparePassword(inputPassword, data.password);

      if (isPasswordCorrect) {
        console.log("비밀번호 확인 성공, 데이터:", data);
        return data;
      } else {
        throw new Error("비밀번호가 올바르지 않습니다.");
      }
    } else {
      throw new Error("문서를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};
