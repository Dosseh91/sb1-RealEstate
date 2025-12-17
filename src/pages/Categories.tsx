import { Link } from "react-router-dom";
import { Tag } from "lucide-react";

const categories = [
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Homes, apartments, land, and commercial properties",
  },
  {
    id: "vehicles",
    name: "Vehicles",
    description: "Cars, motorcycles, boats, and other vehicles",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Computers, phones, TVs, and other electronic devices",
  },
  {
    id: "furniture",
    name: "Furniture",
    description: "Home and office furniture, decor, and appliances",
  },
  {
    id: "jobs",
    name: "Jobs",
    description: "Job listings and career opportunities",
  },
  {
    id: "services",
    name: "Services",
    description: "Professional services and skilled trades",
  },
];

const Categories: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-4">
        Browse by Category
      </h1>

      <p className="text-center text-gray-600 mb-12">
        Explore our wide range of categories to find exactly what you're looking for
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/listings?category=${category.id}`}
            className="group bg-white border rounded-xl p-6 flex justify-between items-center hover:shadow-lg transition"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Tag className="text-gray-600 group-hover:text-teal-600" />
              </div>

              <div>
                <h3 className="text-lg font-semibold group-hover:text-teal-600">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </div>
            </div>

            <span className="text-gray-400 group-hover:text-teal-600 text-xl">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

