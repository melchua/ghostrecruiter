interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button
    className="bg-primaryDim  text-white px-4 py-1 rounded-full text-sm transition-transform duration-200 hover:scale-105"
    onClick={onClick}
  >
    {children}
  </button>
);
