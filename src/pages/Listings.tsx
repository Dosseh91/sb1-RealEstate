import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListFilter, Search, X } from 'lucide-react';

import ListingCard from '../components/listings/ListingCard';
import Button from '../components/common/Button';
import { Listing } from '../types';
import { listings as mockListings, categories } from '../data/mockData';

const Listings: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  /* ---------------- URL FILTERS ---------------- */
  const categoryFilter = searchParams.get('category') || '';
  const priceMinFilter = searchParams.get('price_min') || '';
  const priceMaxFilter = searchParams.get('price_max') || '';
  const searchFilter = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';

  /* ---------------- FORM STATE ---------------- */
  const [filters, setFilters] = useState({
    category: categoryFilter,
    priceMin: priceMinFilter,
    priceMax: priceMaxFilter,
    search: searchFilter,
  });

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    const approvedListings = mockListings.filter(
      (listing) => listing.status === 'approved'
    );
    setListings(approvedListings);
  }, []);

  /* ---------------- APPLY FILTERS ---------------- */
  useEffect(() => {
    let result = [...listings];

    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      result = result.filter(
        (l) => l.categoryId === categoryFilter
      );
    }

    if (priceMinFilter) {
      result = result.filter(
        (l) => l.price >= Number(priceMinFilter)
      );
    }

    if (priceMaxFilter) {
      result = result.filter(
        (l) => l.price <= Number(priceMaxFilter)
      );
    }

    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'oldest':
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    setFilteredListings(result);
  }, [
    listings,
    categoryFilter,
    priceMinFilter,
    priceMaxFilter,
    searchFilter,
    sortBy,
  ]);

  /* ---------------- HANDLERS ---------------- */
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (filters.category) params.set('category', filters.category);
    if (filters.priceMin) params.set('price_min', filters.priceMin);
    if (filters.priceMax) params.set('price_max', filters.priceMax);
    if (filters.search) params.set('search', filters.search);
    params.set('sort', sortBy);

    setSearchParams(params);
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

  const hasActiveFilters =
    categoryFilter || priceMinFilter || priceMaxFilter || searchFilter;

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Browse Listings</h1>

      {categoryFilter && (
        <p className="mb-4 text-gray-600">
          Category:{' '}
          <span className="font-semibold">
            {categories.find(c => c.id === categoryFilter)?.name}
          </span>
        </p>
      )}

      {/* SEARCH */}
      <form onSubmit={applyFilters} className="relative max-w-xl mb-6">
        <Search className="absolute left-3 top-2.5 text-gray-400" />
        <input
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search listings..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
        />
      </form>

      {/* RESULTS */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="mb-4">No listings found</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Listings;
