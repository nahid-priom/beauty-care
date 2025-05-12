import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DesktopSearch = ({
  searchQuery = "",
  setSearchQuery = () => {},
  handleSearch = () => {},
  onFocus = () => {},
  onBlur = () => {},
}) => {
  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#770504]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 bg-[#770504] text-white rounded-r hover:bg-[#5a0403] transition-colors"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
  );
};

export default DesktopSearch;