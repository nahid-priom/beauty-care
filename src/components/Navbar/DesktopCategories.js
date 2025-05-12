import PRODUCT_CATEGORIES from "../../data/products-category";


const DesktopCategories = ({ active, handleCategoryClick }) => (
  <div className="hidden md:flex justify-center border-t border-gray-200 py-2">
    <ul className="flex space-x-6">
      {PRODUCT_CATEGORIES.map((category) => (
        <li key={category.id} className="relative">
          <button
            onClick={() => handleCategoryClick(category.id)}
            className={`px-2 py-1 font-medium transition-colors duration-300 ${
              active === category.title ? "text-[#770504]" : "text-gray-700 hover:text-[#770504]"
            }`}
          >
            {category.title}
            {active === category.title && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-[#770504]" />
            )}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default DesktopCategories;