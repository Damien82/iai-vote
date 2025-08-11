import React from "react";
import SuperLoginForm from "../components/Connexion_superadmin";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <SuperLoginForm />
    </div>
  );
};

export default LoginPage;
