const StockFilter = ({ filters, toggleFilter }) => (
  <div className="mb-6">
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={filters.inStock}
        onChange={() => toggleFilter("inStock", !filters.inStock)}
        className="rounded text-[#770504] focus:ring-[#770504] mr-2"
      />
      <span className="text-gray-600">In Stock Only</span>
    </label>
  </div>
);

export default StockFilter;
