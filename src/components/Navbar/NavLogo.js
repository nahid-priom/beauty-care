import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NavLogo = () => (
  <div className="flex items-center">
    <Link to="/">
      <img
        src={logo}
        alt="Logo"
        className="w-[120px] h-[60px] lg:w-[180px] lg:h-[80px] object-contain"
      />
    </Link>
  </div>
);

export default NavLogo;
