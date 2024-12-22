import styled from "styled-components";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { CardFormStyle } from "../home/CardForm";

interface Props {
  children: Array<React.ReactNode>;
  isOpen: boolean;
  onClose: () => void;
}

function Modal({ children, isOpen, onClose }: Props) {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const previousFocusedElement = useRef<HTMLElement | null>(null);

  const header = children[0];
  const content = children[1];

  const handleClose = () => {
    setIsAnimating(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose();
    }
  }, []);

  const handleAnimationEnd = () => {
    if (isAnimating) {
      setIsAnimating(false);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      previousFocusedElement.current = document.activeElement as HTMLElement;
      window.addEventListener("keydown", handleKeydown);

      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      window.removeEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      if (previousFocusedElement.current) {
        previousFocusedElement.current.focus();
      }
    };
  }, [isOpen, handleKeydown]);

  if (!isOpen && !isAnimating) return null;

  return createPortal(
    <ModalStyle
      className={isAnimating ? "fade-out" : "fade-in"}
      onClick={handleOverlayClick}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="modal-body" ref={modalRef} role="dialog" tabIndex={-1}>
        <div className="modal-header">
          <button
            className="modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <IoClose />
          </button>
          <CardFormStyle>{header}</CardFormStyle>
        </div>
        <div className="modal-contents">
          <CardFormStyle>{content}</CardFormStyle>
        </div>
      </div>
    </ModalStyle>,
    document.body
  );
}

const ModalStyle = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);

  /* Firefox */
  scrollbar-width: none;

  /* Webkit 기반 브라우저 (Chrome, Safari, Edge) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* IE, Edge */
  -ms-overflow-style: none;

  hr {
    width: 100%;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.color.onSurface};
    margin: 1rem 0;
  }

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${({ theme }) => theme?.borderRadius?.default || "8px"};
    box-shadow: ${({ theme }) => theme?.shadow?.default};

    background: ${({ theme }) => theme?.color?.background};
    min-width: 30rem;
    max-width: 80vw;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: clip;
  }

  .modal-header {
    position: sticky;
    top: 0;
    left: 0;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: left;
    padding: 1rem 2rem;
    gap: 0.5rem;
    z-index: 1000;
  }

  .modal-contents {
    display: flex;
    border-radius: ${({ theme }) => theme.borderRadius.default || "8px"};
    overflow-y: auto;
    padding: 2rem;
  }

  .modal-close {
    border: none;
    color: ${({ theme }) => theme?.color?.onSurface};
    background: transparent;
    cursor: pointer;

    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1000;

    svg {
      width: 2rem;
      height: 2rem;

      &:hover {
        color: ${({ theme }) => theme?.color?.primary};
        transform: rotate(90deg);
        transition: transform 0.3s ease;
      }
    }
  }
`;

export default Modal;
