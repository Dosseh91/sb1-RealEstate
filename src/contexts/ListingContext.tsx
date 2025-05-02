import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Listing, ListingStatus } from '../types';
import { listings as mockListings, generateId, getCurrentTimestamp } from '../data/mockData';

interface ListingContextType {
  listings: Listing[];
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateListingStatus: (id: string, status: ListingStatus) => Promise<void>;
  updateListing: (listing: Listing) => Promise<void>;
  deleteListing: (id: string) => Promise<void>;
  getListingsByStatus: (status: ListingStatus) => Listing[];
  getListingsByAgency: (agencyId: string) => Listing[];
  getListingsByCategory: (categoryId: string) => Listing[];
  getListingById: (id: string) => Listing | undefined;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

interface ListingProviderProps {
  children: ReactNode;
}

export const ListingProvider: React.FC<ListingProviderProps> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Initialize with mock data
    setListings(mockListings);
  }, []);

  const addListing = async (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>) => {
    const timestamp = getCurrentTimestamp();
    const newListing: Listing = {
      ...listing,
      id: generateId(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    
    setListings(prev => [...prev, newListing]);
    return Promise.resolve();
  };

  const updateListingStatus = async (id: string, status: ListingStatus) => {
    setListings(prev => 
      prev.map(listing => 
        listing.id === id 
          ? { ...listing, status, updatedAt: getCurrentTimestamp() } 
          : listing
      )
    );
    return Promise.resolve();
  };

  const updateListing = async (updatedListing: Listing) => {
    setListings(prev => 
      prev.map(listing => 
        listing.id === updatedListing.id 
          ? { ...updatedListing, updatedAt: getCurrentTimestamp() } 
          : listing
      )
    );
    return Promise.resolve();
  };

  const deleteListing = async (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
    return Promise.resolve();
  };

  const getListingsByStatus = (status: ListingStatus) => {
    return listings.filter(listing => listing.status === status);
  };

  const getListingsByAgency = (agencyId: string) => {
    return listings.filter(listing => listing.agencyId === agencyId);
  };

  const getListingsByCategory = (categoryId: string) => {
    return listings.filter(listing => listing.categoryId === categoryId);
  };

  const getListingById = (id: string) => {
    return listings.find(listing => listing.id === id);
  };

  return (
    <ListingContext.Provider value={{ 
      listings, 
      addListing, 
      updateListingStatus, 
      updateListing, 
      deleteListing, 
      getListingsByStatus, 
      getListingsByAgency, 
      getListingsByCategory, 
      getListingById 
    }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingProvider');
  }
  return context;
};