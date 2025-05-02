import { v4 as uuidv4 } from 'uuid';
import { User, Agency, Category, Listing, Message } from '../types';

export const users: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    verified: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'agency1@example.com',
    name: 'Luxury Homes Agency',
    role: 'agency',
    verified: true,
    createdAt: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    email: 'agency2@example.com',
    name: 'CarSell Professional',
    role: 'agency',
    verified: true,
    createdAt: '2023-01-03T00:00:00Z',
  },
  {
    id: '4',
    email: 'agency3@example.com',
    name: 'Tech Gear Pro',
    role: 'agency',
    verified: false,
    createdAt: '2023-01-04T00:00:00Z',
  },
];

export const agencies: Agency[] = [
  {
    id: '1',
    userId: '2',
    name: 'Luxury Homes Agency',
    description: 'We specialize in high-end real estate properties for discerning clients.',
    logo: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    address: '123 Luxury Lane, Beverly Hills, CA 90210',
    phone: '+1 (123) 456-7890',
    email: 'info@luxuryhomes.example.com',
    website: 'https://luxuryhomes.example.com',
    verified: true,
  },
  {
    id: '2',
    userId: '3',
    name: 'CarSell Professional',
    description: 'Premier automotive sales agency with a wide selection of vehicles.',
    logo: 'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    address: '456 Auto Drive, Detroit, MI 48226',
    phone: '+1 (234) 567-8901',
    email: 'sales@carsell.example.com',
    website: 'https://carsell.example.com',
    verified: true,
  },
  {
    id: '3',
    userId: '4',
    name: 'Tech Gear Pro',
    description: 'Latest technology gadgets and electronics from trusted brands.',
    logo: 'https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    address: '789 Tech Ave, San Francisco, CA 94107',
    phone: '+1 (345) 678-9012',
    email: 'sales@techgear.example.com',
    website: 'https://techgear.example.com',
    verified: false,
  },
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Real Estate',
    description: 'Homes, apartments, land, and commercial properties',
    icon: 'home',
    slug: 'real-estate',
  },
  {
    id: '2',
    name: 'Vehicles',
    description: 'Cars, motorcycles, boats, and other vehicles',
    icon: 'car',
    slug: 'vehicles',
  },
  {
    id: '3',
    name: 'Electronics',
    description: 'Computers, phones, TVs, and other electronic devices',
    icon: 'smartphone',
    slug: 'electronics',
  },
  {
    id: '4',
    name: 'Furniture',
    description: 'Home and office furniture, decor, and appliances',
    icon: 'sofa',
    slug: 'furniture',
  },
  {
    id: '5',
    name: 'Jobs',
    description: 'Job listings and career opportunities',
    icon: 'briefcase',
    slug: 'jobs',
  },
  {
    id: '6',
    name: 'Services',
    description: 'Professional services and skilled trades',
    icon: 'wrench',
    slug: 'services',
  },
];

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with Ocean View',
    description: 'Beautiful 3-bedroom penthouse with panoramic ocean views, featuring high-end finishes, a gourmet kitchen, and private rooftop terrace.',
    price: 1500000,
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    status: 'approved',
    agencyId: '1',
    categoryId: '1',
    location: 'Miami, FL',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-02T00:00:00Z',
  },
  {
    id: '2',
    title: 'Modern Downtown Loft',
    description: 'Spacious industrial-style loft in the heart of downtown, featuring exposed brick walls, high ceilings, and modern amenities.',
    price: 850000,
    images: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    status: 'approved',
    agencyId: '1',
    categoryId: '1',
    location: 'New York, NY',
    createdAt: '2023-02-03T00:00:00Z',
    updatedAt: '2023-02-04T00:00:00Z',
  },
  {
    id: '3',
    title: '2023 Mercedes-Benz S-Class',
    description: 'Brand new 2023 Mercedes-Benz S-Class with all available luxury features and extended warranty.',
    price: 120000,
    images: [
      'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2365572/pexels-photo-2365572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    status: 'approved',
    agencyId: '2',
    categoryId: '2',
    location: 'Los Angeles, CA',
    createdAt: '2023-02-05T00:00:00Z',
    updatedAt: '2023-02-06T00:00:00Z',
  },
  {
    id: '4',
    title: 'Tesla Model Y Performance',
    description: 'Like-new Tesla Model Y Performance with full self-driving capability, premium interior, and all available upgrades.',
    price: 65000,
    images: [
      'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    status: 'pending',
    agencyId: '2',
    categoryId: '2',
    location: 'San Francisco, CA',
    createdAt: '2023-02-07T00:00:00Z',
    updatedAt: '2023-02-08T00:00:00Z',
  },
  {
    id: '5',
    title: 'Apple MacBook Pro 16" M2 Max',
    description: 'Latest Apple MacBook Pro with M2 Max chip, 32GB RAM, 1TB SSD, and AppleCare+ coverage.',
    price: 3499,
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    status: 'pending',
    agencyId: '3',
    categoryId: '3',
    location: 'Online',
    createdAt: '2023-02-09T00:00:00Z',
    updatedAt: '2023-02-10T00:00:00Z',
  },
  {
    id: '6',
    title: 'Samsung 85" Neo QLED 8K Smart TV',
    description: 'Immersive viewing experience with Samsung\'s latest 8K television featuring AI upscaling and premium sound system.',
    price: 5999,
    images: [
      'https://images.pexels.com/photos/6976103/pexels-photo-6976103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    status: 'rejected',
    agencyId: '3',
    categoryId: '3',
    location: 'Online',
    createdAt: '2023-02-11T00:00:00Z',
    updatedAt: '2023-02-12T00:00:00Z',
  },
];

export const messages: Message[] = [
  {
    id: '1',
    listingId: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (123) 456-7890',
    message: 'I\'m interested in this property. Could I schedule a viewing for this weekend?',
    agencyId: '1',
    createdAt: '2023-03-01T00:00:00Z',
    read: false,
  },
  {
    id: '2',
    listingId: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (234) 567-8901',
    message: 'Is this car still available? I would like to see it in person and take it for a test drive.',
    agencyId: '2',
    createdAt: '2023-03-02T00:00:00Z',
    read: true,
  },
];

// Helper functions to interact with mock data
export const generateId = () => uuidv4();

export const getCurrentTimestamp = () => new Date().toISOString();

// Auth related functions
export const findUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};

export const findAgencyByUserId = (userId: string) => {
  return agencies.find(agency => agency.userId === userId);
};

// Listing related functions
export const getListingsByAgencyId = (agencyId: string) => {
  return listings.filter(listing => listing.agencyId === agencyId);
};

export const getListingById = (id: string) => {
  return listings.find(listing => listing.id === id);
};

export const getListingsByStatus = (status: string) => {
  return listings.filter(listing => listing.status === status);
};

export const getListingsByCategory = (categoryId: string) => {
  return listings.filter(listing => listing.categoryId === categoryId);
};

// Category related functions
export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

// Message related functions
export const getMessagesByAgencyId = (agencyId: string) => {
  return messages.filter(message => message.agencyId === agencyId);
};

export const getMessagesByListingId = (listingId: string) => {
  return messages.filter(message => message.listingId === listingId);
};