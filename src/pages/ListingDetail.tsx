import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, ChevronLeft, ChevronRight, Building } from 'lucide-react';
import Button from '../components/common/Button';
import ContactForm from '../components/listings/ContactForm';
import StatusBadge from '../components/common/StatusBadge';
import { Listing, Agency } from '../types';
import { getListingById, getCategoryById, agencies } from '../data/mockData';

const ListingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<Listing | null>(null);
  const [agency, setAgency] = useState<Agency | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const foundListing = getListingById(id);
      
      if (foundListing) {
        setListing(foundListing);
        
        // Find the agency
        const foundAgency = agencies.find(a => a.id === foundListing.agencyId);
        setAgency(foundAgency || null);
      }
    }
    
    setIsLoading(false);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!listing) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-primary-800 mb-4">Listing Not Found</h1>
        <p className="text-primary-600 mb-6">
          The listing you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/listings">
          <Button variant="primary">
            Browse All Listings
          </Button>
        </Link>
      </div>
    );
  }
  
  const category = getCategoryById(listing.categoryId);
  
  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button and breadcrumbs */}
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-primary-600 hover:text-primary-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to listings</span>
        </button>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - listing details */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <h1 className="text-3xl font-bold text-primary-800">{listing.title}</h1>
              <div className="flex items-center">
                <StatusBadge status={listing.status} />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {category?.name || 'Uncategorized'}
              </span>
              <span className="inline-flex items-center text-primary-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" /> {listing.location}
              </span>
              <span className="text-sm text-primary-500">
                Posted on {new Date(listing.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-accent-700 my-2">
              {formatter.format(listing.price)}
            </h2>
          </div>
          
          {/* Image gallery */}
          <div className="mb-8">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={listing.images[activeImageIndex] || 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                  }}
                />
              </div>
              
              {listing.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
                  >
                    <ChevronLeft className="h-6 w-6 text-primary-800" />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-accent-500"
                  >
                    <ChevronRight className="h-6 w-6 text-primary-800" />
                  </button>
                </>
              )}
            </div>
            
            {listing.images.length > 1 && (
              <div className="mt-2 flex space-x-2 overflow-x-auto pb-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      activeImageIndex === index ? 'border-accent-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${listing.title} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">Description</h3>
            <div className="prose text-primary-700 max-w-none">
              <p className="whitespace-pre-line">{listing.description}</p>
            </div>
          </div>
          
          {/* Agency info (mobile only) */}
          <div className="md:hidden mb-8">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">Listed By</h3>
            {agency && (
              <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  {agency.logo ? (
                    <img 
                      src={agency.logo} 
                      alt={agency.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building className="w-full h-full p-2 text-gray-400" />
                  )}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-primary-800">
                    {agency.name}
                    {agency.verified && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
                        Verified
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-primary-600">{agency.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - contact form and agency info */}
        <div>
          {/* Agency info (desktop only) */}
          <div className="hidden md:block mb-6">
            <h3 className="text-xl font-semibold text-primary-800 mb-4">Listed By</h3>
            {agency && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                    {agency.logo ? (
                      <img 
                        src={agency.logo} 
                        alt={agency.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building className="w-full h-full p-2 text-gray-400" />
                    )}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-primary-800">
                      {agency.name}
                    </h4>
                    {agency.verified && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-800">
                        Verified Agency
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-primary-600 mb-4">
                  <p className="mb-1">{agency.address}</p>
                  <p className="mb-1">{agency.phone}</p>
                  <p>{agency.email}</p>
                </div>
                
                {agency.website && (
                  <a 
                    href={agency.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-600 hover:text-accent-800 hover:underline text-sm flex items-center"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            )}
          </div>
          
          {/* Contact form */}
          <ContactForm listing={listing} />
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;