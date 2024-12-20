import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function NewCard() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Firestore에 데이터 저장
      const docRef = await addDoc(collection(db, "businessCards"), formData);
      // 생성된 문서 ID로 QR 코드 URL 생성
      navigate(`/card/${docRef.id}`);
    } catch (error) {
      console.error("Error creating card: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="이름" onChange={handleChange} required />
      <input
        name="contact"
        placeholder="연락처"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={handleChange}
        required
      />
      <button type="submit">명함 생성</button>
    </form>
  );
}

export default NewCard;
