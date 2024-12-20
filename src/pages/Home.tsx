import QRULogoCard from "../components/home/QRULogoCard";
import styled from "styled-components";

function Home() {
  return (
    <HomeStyle>
      <section className="section">
        <QRULogoCard />
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default Home;
