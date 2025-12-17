import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Tag, MapPin, Building2, Star } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ListingCard from '../components/listings/ListingCard';
import { categories, listings } from '../data/mockData';

const Home: React.FC = () => {
  // Only show approved listings
  const approvedListings = listings.filter(listing => listing.status === 'approved');
  const featuredListings = approvedListings.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover Professional Listings from Verified Agencies
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Browse quality listings across multiple categories, all verified by our admin team.
            </p>
            
            <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                <div className="relative flex-grow">
                  <input 
                    type="text" 
                    placeholder="What are you looking for?" 
                    className="w-full pl-10 pr-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-accent-500"
                  />
                  <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                </div>
                <div className="w-full md:w-48">
                  <select className="w-full px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-accent-500">
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Button variant="secondary" size="lg">
                  Search
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/listings">
                <Button size="lg">
                  Browse All Listings
                </Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg" className="!text-white border-white hover:bg-white/10">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">Browse by Category</h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Explore our wide range of categories to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map(category => (
              <Link
                key={category.id}
                to={`/listings?category=${category.slug}`}
              >
                <Card hoverable className="h-full group">
                  <div className="p-6 flex items-center">
                    <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mr-4 group-hover:bg-accent-100 transition-colors">
                      <Tag className="h-6 w-6 text-primary-600 group-hover:text-accent-600 transition-colors" />
                    </div>

                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1 group-hover:text-accent-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-primary-600">
                      {category.description}
                    </p>
                </div>

                <ArrowRight className="ml-auto h-5 w-5 text-primary-400 group-hover:text-accent-500 transform group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
           </Link>
          ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/categories">
              <Button variant="outline">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-2">Featured Listings</h2>
              <p className="text-lg text-primary-600">
                Hand-picked quality listings from our verified agencies
              </p>
            </div>
            <Link to="/listings">
              <Button variant="outline" className="hidden sm:flex">
                View All Listings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          
          <div className="text-center mt-10 sm:hidden">
            <Link to="/listings">
              <Button variant="outline">
                View All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">How It Works</h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Our platform ensures quality listings through a simple but effective process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Verified Agencies</h3>
              <p className="text-primary-600">
                We only allow verified professional agencies to post listings on our platform, ensuring trustworthy offers.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Admin Approval</h3>
              <p className="text-primary-600">
                Every listing is reviewed by our admin team before being published to ensure quality and prevent fraud.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Direct Contact</h3>
              <p className="text-primary-600">
                Easily contact agencies about listings that interest you through our built-in messaging system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-4">Are you an agency looking to post listings?</h2>
              <p className="text-xl text-primary-100 mb-6 md:mb-0">
                Register your agency today and start showcasing your listings to our audience.
              </p>
            </div>
            <div className="md:w-1/3 text-center md:text-right">
              <Link to="/register">
                <Button variant="secondary" size="lg">
                  Register as Agency
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
