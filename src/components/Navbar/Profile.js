import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/AuthSlice";
import { persistor } from "../../redux/store";

const ProfileIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => navigate("/login");
  const handleProfile = () => navigate("/profile");
  const handleLogout = async () => {
    dispatch(logout());
    await persistor.flush();
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
