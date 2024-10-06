import React, { useEffect } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    // Close modal on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black opacity-50 z-5"
        onClick={onClose}
      ></div>{" "}
      {/* Overlay backdrop */}
      <div className="bg-white min-h-[300px] min-w-[400px] border-gray-300 border-2 rounded-md w-1/2 h-1/2 fixed inset-0 mx-auto my-auto z-10 flex flex-col items-center justify-center shadow-md">
        <header>
          <h2 className="text-center mb-4">{title}</h2>
          <button
            className="absolute top-2 right-5"
            id="close-button"
            autoFocus
            onClick={onClose}
          >
            X
          </button>
        </header>
        {children}
      </div>
    </>
  );
};

export default Modal;
