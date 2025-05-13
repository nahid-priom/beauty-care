import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfileIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [user, setUser] = useState(null); // Local state for auth
  const navigate = useNavigate();

  // Simulated auth check (replace with context or real auth later)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")); // or use sessionStorage
    setUser(storedUser);
  }, []);

  const handleLogin = () => navigate("/login");
  const handleProfile = () => navigate("/profile");
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div
      className="relative ml-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FontAwesomeIcon
        icon={faUser}
        className="text-xl text-gray-700 cursor-pointer"
      />

      {isHovered && (
        <div className="absolute right-0 top-3 mt-2 w-44 bg-white shadow-lg rounded-lg border z-50">
          {!user ? (
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
            >
              Log In
            </button>
          ) : (
            <div className="flex flex-col">
              <button
                onClick={handleProfile}
                className="px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                My Profile
              </button>
              <button className="px-4 py-2 text-sm text-left hover:bg-gray-100">
                Orders
              </button>
              <button className="px-4 py-2 text-sm text-left hover:bg-gray-100">
                Track Order
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
