import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const Subcategory = () => {
  const { category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [formattedCategory, setFormattedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cacheExpiry =  60 * 60 * 1000;
  
    const fetchSubcategories = async () => {
      setLoading(true);
  
      
      const cachedData = localStorage.getItem(`subcategories_${category}`);
      const cachedTime = localStorage.getItem(`subcategories_time_${category}`);
  
      if (cachedData && cachedTime && (Date.now() - cachedTime < cacheExpiry)) {
       
        const cachedSubcategories = JSON.parse(cachedData);
        
        
        const sortedSubcategories = cachedSubcategories.sort((a, b) => a.serial - b.serial);
        setSubcategories(sortedSubcategories);
        setFormattedCategory(category.charAt(0).toUpperCase() + category.slice(1));
        setLoading(false);
        return;
      }
  
      try {
        
        const subcategoryRes = await axios.get(
          `https://backend.phonespotmd.com/api/category/subcategory/${category}`
        );
        const subcategoryData = subcategoryRes.data.categories || [];
  
        
        const sortedSubcategories = subcategoryData.sort((a, b) => a.serial - b.serial);
  
       
        setSubcategories(sortedSubcategories);
        setFormattedCategory(category.charAt(0).toUpperCase() + category.slice(1));
  
       
        localStorage.setItem(`subcategories_${category}`, JSON.stringify(sortedSubcategories));
        localStorage.setItem(`subcategories_time_${category}`, Date.now());
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSubcategories();
  }, [category]);
  
  

  return (
    <>
      <Navbar />

      <div className="max-w-7xl pt-32 mx-auto p-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 lg:p-6 rounded-lg shadow-lg mb-2 lg:mb-8">
          <h1 className="text-xl lg:text-4xl font-bold text-white text-center lg:mb-4">
            {`${formattedCategory} Series`}
          </h1>
          <p className="text-white hidden lg:block text-center max-w-xl mx-auto">
            Browse through the available series in the {formattedCategory} category.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <p className="text-gray-500 ml-4">Loading series...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-8">
            {subcategories.length === 0 ? (
              <p className="text-center text-gray-500">No series available for this category.</p>
            ) : (
              subcategories.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="bg-white p-4 flex flex-col items-center shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                >
                  
                  <Link to={`/subcategory/${category}/${subcategory.slug}`}>
                    <img
                      src={`https://backend.phonespotmd.com/${subcategory.image}`}
                      alt={subcategory.name}
                      className="w-full my-3 flex justify-center h-36 object-contain"
                    />
                    <div className=" flex flex-col items-center gap-2">
                      <h3 className="text-sm lg:text-base font-semibold text-gray-800 text-center">
                        {subcategory.name}
                      </h3>
                      <span className="bg-red-500 text-sm lg:text-base font-bold text-white px-2 py-1 rounded-full">
                        View Models
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Subcategory;
