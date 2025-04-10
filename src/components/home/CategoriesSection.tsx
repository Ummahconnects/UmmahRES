
import { Link } from "react-router-dom";

// Business categories
const categories = [
  { name: "Restaurants", icon: "🍽️" },
  { name: "Grocery", icon: "🛒" },
  { name: "Healthcare", icon: "🏥" },
  { name: "Education", icon: "📚" },
  { name: "Professional", icon: "💼" },
  { name: "Finance", icon: "💰" }
];

const CategoriesSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-muslim-dark">Browse by Category</h2>
          <p className="text-gray-600 mt-2">Explore businesses across different categories</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={`/businesses?category=${category.name.toLowerCase()}`}
              className="flex flex-col items-center p-6 bg-white rounded-lg border hover:shadow-md transition-shadow text-center"
            >
              <span className="text-3xl mb-3">{category.icon}</span>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
