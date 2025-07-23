import React from "react";
import { useAuth } from "../../../context/AuthContext";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  logout?: boolean; // 👈 nouveau prop pour déclencher la déconnexion
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  disabled,
  logout = false, // 👈 valeur par défaut
  ...props
}) => {
  const { logout: performLogout } = useAuth();

  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium transition duration-200";
  
  const variants: Record<string, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const disabledStyle = disabled ? "opacity-50 cursor-not-allowed" : "";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (logout) {
      performLogout();
      localStorage.removeItem("user");
      window.location.href = "/choixrole"; // Redirection après déconnexion
      return;
    }

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${disabledStyle} ${className}`}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
