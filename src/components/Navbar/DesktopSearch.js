import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DesktopSearch = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchSuggestions,
  setSearchSuggestions,
}) => (
  <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        placeholder="Search for products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-[#770504]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-0 top-0 h-full px-4 bg-[#770504] text-white rounded-r hover:bg-[#5a0403]"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>

    {/* Search Suggestions */}
    {searchSuggestions.length > 0 && (
      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-50">
        {searchSuggestions.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="flex items-center p-2 hover:bg-gray-100"
            onClick={() => {
              setSearchQuery("");
              setSearchSuggestions([]);
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 object-cover mr-3"
            />
            <div className="flex flex-col w-full">
              <div className="font-medium text-gray-800">{product.name}</div>
              <div className="flex justify-start gap-4">
                <div className="text-sm text-gray-500">{product.category}</div>
                <div className="text-sm font-bold text-[#770504]">
                  $
                  {product.discountPrice
                    ? product.discountPrice.toFixed(2)
                    : product.price.toFixed(2)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);

export default DesktopSearch;
