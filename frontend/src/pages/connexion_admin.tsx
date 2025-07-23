import React from "react";
import LoginForm from "../components/connexion_admin";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
