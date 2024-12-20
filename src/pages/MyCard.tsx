import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { QRCodeCanvas } from "qrcode.react";

interface CardData {
  name: string;
  contact: string;
  email: string;
}

function MyCard() {
  const { id } = useParams<{ id: string }>(); // URL의 ID 가져오기
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) {
        setError("유효하지 않은 ID입니다.");
        return;
      }

      try {
        const docRef = doc(db, "businessCards", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCardData(docSnap.data() as CardData); // 데이터 타입 지정
        } else {
          setError("해당 명함 데이터를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching card: ", error);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchCard();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!cardData) return <div>Loading...</div>;

  const cardUrl = `${window.location.origin}/card/${id}`;

  return (
    <div>
      <h1>{cardData.name}</h1>
      <p>연락처: {cardData.contact}</p>
      <p>이메일: {cardData.email}</p>
      <QRCodeCanvas
        value={cardUrl}
        size={200}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"Q"} // Error correction level
        includeMargin={true} // 여백 포함
      />
      <p>QR 코드를 스캔하여 이 명함 페이지를 공유하세요!</p>
    </div>
  );
}

export default MyCard;
