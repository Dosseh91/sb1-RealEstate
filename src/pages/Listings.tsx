import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ListFilter, Search, ChevronDown, X } from 'lucide-react';
import ListingCard from '../components/listings/ListingCard';
import Button from '../components/common/Button';
import { Listing } from '../types';
import { listings as mockListings, categories } from '../data/mockData';

const Listings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Parse filters from URL
  const categoryFilter = searchParams.get('category') || '';
  const priceMinFilter = searchParams.get('price_min') || '';
  const priceMaxFilter = searchParams.get('price_max') || '';
  const searchFilter = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  
  // Form state
  const [filters, setFilters] = useState({
    category: categoryFilter,
    priceMin: priceMinFilter,
    priceMax: priceMaxFilter,
    search: searchFilter,
  });
  
  // Initialize with mock data (only approved listings)
  useEffect(() => {
    const approvedListings = mockListings.filter(listing => listing.status === 'approved');
    setListings(approvedListings);
  }, []);
  
  // Apply filters
  useEffect(() => {
    let result = [...listings];
    
    // Apply search filter
    if (searchFilter) {
      const searchLower = searchFilter.toLowerCase();
      result = result.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) || 
        listing.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(listing => listing.categoryId === categoryFilter);
    }
    
    // Apply price filters
    if (priceMinFilter) {
      const min = parseFloat(priceMinFilter);
      result = result.filter(listing => listing.price >= min);
    }
    
    if (priceMaxFilter) {
      const max = parseFloat(priceMaxFilter);
      result = result.filter(listing => listing.price <= max);
    }
    
    // Apply sorting
    if (sortBy === 'price_low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      // Default: newest first
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    setFilteredListings(result);
  }, [listings, categoryFilter, priceMinFilter, priceMaxFilter, searchFilter, sortBy]);
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL with filters
    const newSearchParams = new URLSearchParams();
    
    if (filters.category) newSearchParams.set('category', filters.category);
    if (filters.priceMin) newSearchParams.set('price_min', filters.priceMin);
    if (filters.priceMax) newSearchParams.set('price_max', filters.priceMax);
    if (filters.search) newSearchParams.set('search', filters.search);
    if (sortBy) newSearchParams.set('sort', sortBy);
    
    setSearchParams(newSearchParams);
    
    // Close mobile filters
    setIsFiltersOpen(false);
  };
  
  const clearFilters = () => {
    setFilters({
      category: '',
      priceMin: '',
      priceMax: '',
      search: '',
    });
    setSearchParams(new URLSearchParams({ sort: sortBy }));
  };
  
  const hasActiveFilters = categoryFilter || priceMinFilter || priceMaxFilter || searchFilter;
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;
    
    // Update URL with new sort parameter but keep existing filters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('sort', newSortValue);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-2">Browse Listings</h1>
        <p className="text-lg text-primary-600">
          Explore our collection of quality, verified listings from professional agencies
        </p>
      </div>
      
      {/* Search and filter bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow max-w-2xl">
            <form onSubmit={applyFilters}>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button type="submit" className="sr-only">Search</button>
            </form>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden"
              icon={<ListFilter className="h-5 w-5" />}
            >
              Filters
            </Button>
            
            <div className="hidden md:block">
              <Button
                variant={hasActiveFilters ? 'primary' : 'outline'}
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                icon={<ListFilter className="h-5 w-5" />}
              >
                {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm text-primary-700 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={handleSortChange}
                className="pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filter panel */}
      {isFiltersOpen && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
          <form onSubmit={applyFilters}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-primary-800">Filters</h3>
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-accent-600 hover:text-accent-800 flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Clear all
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-primary-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="priceMin" className="block text-sm font-medium text-primary-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  id="priceMin"
                  name="priceMin"
                  value={filters.priceMin}
                  onChange={handleFilterChange}
                  placeholder="Min Price"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              
              <div>
                <label htmlFor="priceMax" className="block text-sm font-medium text-primary-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  id="priceMax"
                  name="priceMax"
                  value={filters.priceMax}
                  onChange={handleFilterChange}
                  placeholder="Max Price"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              
              <div className="flex items-end">
                <Button type="submit" variant="secondary" fullWidth>
                  Apply Filters
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      {/* Active filters badges */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-primary-700">Active Filters:</span>
          
          {categoryFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              {categories.find(c => c.id === categoryFilter)?.name || 'Category'}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: '' }));
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('category');
                  setSearchParams(newParams);
                }}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          
          {priceMinFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Min: ${priceMinFilter}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, priceMin: '' }));
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('price_min');
                  setSearchParams(newParams);
                }}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          
          {priceMaxFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Max: ${priceMaxFilter}
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, priceMax: '' }));
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('price_max');
                  setSearchParams(newParams);
                }}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
          
          {searchFilter && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
              Search: "{searchFilter}"
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, search: '' }));
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete('search');
                  setSearchParams(newParams);
                }}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X className="h-4 w-4" />
              </button>
            </span>
          )}
        </div>
      )}
      
      {/* Results count */}
      <div className="mb-6">
        <p className="text-sm text-primary-600">
          Showing <span className="font-medium">{filteredListings.length}</span> results
          {hasActiveFilters ? ' with applied filters' : ''}
        </p>
      </div>
      
      {/* Listings grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-primary-800 mb-2">No Listings Found</h3>
          <p className="text-primary-600 mb-6">
            We couldn't find any listings matching your criteria.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Listings;