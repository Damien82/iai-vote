import * as React from "react"; // alternative plus "tolérante"

const Loader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "1.5rem",
      fontWeight: "bold",
    }}>
      Chargement...
    </div>
  );
};

export default Loader;
