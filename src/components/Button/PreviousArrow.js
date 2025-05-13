import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white/80 text-[#770504] p-2 rounded-full shadow-md hover:bg-white transition-all"
    aria-label="Previous"
  >
    <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
  </button>
);

export default PrevArrow;