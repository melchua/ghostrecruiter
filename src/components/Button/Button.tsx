interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded-full"
    onClick={onClick}
  >
    {children}
  </button>
);
