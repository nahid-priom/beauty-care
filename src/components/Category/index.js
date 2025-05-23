// src/components/CategoryList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductsLoading from "../Preloader";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const FetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/category-list"
        );
        if (!response.ok) {
          throw new Error("Error fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    FetchCategories();
  }, []);

  if (loading) return <ProductsLoading />;
  if (error)
    return <div className="text-red-500 text-center py-8">Error: {error}</div>;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="group relative block overflow-hidden rounded-lg bg-gray-100 p-6 text-center hover:bg-[#770504] hover:text-white transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 mb-3 bg-white rounded-full flex items-center justify-center group-hover:bg-[#5a0403] transition-colors">
                  <span className="text-2xl">📦</span> {/* Placeholder icon */}
                </div>
                <h3 className="font-medium text-gray-900 group-hover:text-white capitalize">
                  {category.replace(/-/g, " ")}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
