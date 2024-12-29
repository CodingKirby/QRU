import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearAllErrors } from "../store/slices/errorSlice";
import { resetForm } from "../store/slices/formSlice";

import styled from "styled-components";
import About from "../components/home/About";
import LogoCard from "../components/home/LogoCard";
import Modal from "../components/common/Modal";
import NewCard from "../components/home/NewCard";

function Home() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    dispatch(resetForm());
    dispatch(clearAllErrors());
    setIsModalOpen(false);
  };

  return (
    <HomeStyle>
      <section id="home-card">
        <LogoCard onClick={openModal} />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <NewCard isOpen={isModalOpen} onClose={closeModal} />
        </Modal>
      </section>
      <section id="home-about">
        <About />
      </section>
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
