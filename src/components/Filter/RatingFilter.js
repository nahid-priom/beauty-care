import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";


const RatingStars = ({ rating }) => {
  return [...Array(5)].map((_, i) => (
    <FontAwesomeIcon
      key={i}
      icon={i < Math.floor(rating) ? faStar : faStarRegular}
      className="text-xs"
    />
  ));
};


const RatingFilter = ({ filters, toggleFilter }) => (
  <div className="mb-6">
    <h4 className="font-medium text-gray-700 mb-3">Rating</h4>
    <div className="flex flex-col space-y-2">
      {[4, 3, 2, 1].map((rating) => (
        <button
          key={rating}
          onClick={() => toggleFilter("rating", filters.rating === rating ? null : rating)}
          className={`flex items-center text-left ${
            filters.rating === rating ? "text-amber-400" : "text-gray-400"
          }`}
        >
          <div className="flex mr-2">
            <RatingStars rating={rating} />
          </div>
          <span className="text-xs text-gray-500">& up</span>
        </button>
      ))}
    </div>
  </div>
);

export default RatingFilter