import { useState } from "react";
import QRULogoCard from "../components/home/QRULogoCard";
import styled from "styled-components";
import Modal from "../components/common/Modal";
import CardForm from "../components/home/CardForm";
import About from "../components/home/About";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const children = CardForm({ isOpen: isModalOpen }).props.children;
  const header = children[0];
  const content = children[1];

  return (
    <HomeStyle>
      <section id="home-card">
        <QRULogoCard onClick={openModal} />
      </section>
      <section id="home-about">
        <About />
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {header}
        {content}
      </Modal>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export default Home;
