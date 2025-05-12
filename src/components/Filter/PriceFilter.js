import PRICE_RANGES from "../../data/constant";
const PriceFilter = ({ filters, toggleFilter }) => (
  <div className="mb-6">
    <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
    <div className="space-y-2">
      {PRICE_RANGES.map((range) => (
        <label key={range.value} className="flex items-center">
          <input
            type="radio"
            name="priceRange"
            checked={filters.priceRange === range.value}
            onChange={() => toggleFilter("priceRange", range.value)}
            className="rounded-full text-[#770504] focus:ring-[#770504] mr-2"
          />
          <span className="text-gray-600">{range.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default PriceFilter;