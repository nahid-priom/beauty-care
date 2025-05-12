
const CategoryFilter = ({ categories, filters, toggleFilter }) => (
  <div className="mb-6">
    <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
    <div className="space-y-2">
      {categories.map((category) => (
        <label key={category} className="flex items-center">
          <input
            type="checkbox"
            checked={filters.category.includes(category)}
            onChange={() => toggleFilter("category", category)}
            className="rounded text-[#770504] focus:ring-[#770504] mr-2"
          />
          <span className="text-gray-600">{category}</span>
        </label>
      ))}
    </div>
  </div>
);

export default CategoryFilter;