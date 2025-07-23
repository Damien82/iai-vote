import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
