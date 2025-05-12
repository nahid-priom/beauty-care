
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ClearCache = () => {
  const navigate = useNavigate();

  useEffect(() => {
   
    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  }, [navigate]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <p className="text-center text-red-600">Clearing cache...</p>
    </div>
  );
};

export default ClearCache;
