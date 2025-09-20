
// src/components/Loader.tsx
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="ml-5 font-bold">Chargement en cours...</p>
    </div>
  );
};

export default Loader;

