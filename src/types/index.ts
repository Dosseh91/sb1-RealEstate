export type UserRole = 'admin' | 'agency' | 'visitor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  createdAt: string;
}

export interface Agency {
  id: string;
  userId: string;
  name: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
}

export type ListingStatus = 'pending' | 'approved' | 'rejected';

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  status: ListingStatus;
  agencyId: string;
  categoryId: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  listingId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  agencyId: string;
  createdAt: string;
  read: boolean;
}