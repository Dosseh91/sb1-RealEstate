import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye } from 'lucide-react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { Listing } from '../../types';
import { getCategoryById } from '../../data/mockData';

interface ListingCardProps {
  listing: Listing;
  showStatus?: boolean;
  className?: string;
}

const ListingCard: React.FC<ListingCardProps> = ({ 
  listing, 
  showStatus = false,
  className = ''
}) => {
  const { id, title, price, images, location, status, categoryId } = listing;
  const category = getCategoryById(categoryId);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  return (
    <Card 
      hoverable 
      className={`h-full transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <Link to={`/listings/${id}`}>
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden">
            <img 
              src={images[0] || 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
              alt={title}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          {showStatus && (
            <div className="absolute top-2 right-2">
              <StatusBadge status={status} />
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-80 rounded-full p-1.5 shadow-sm">
            <Eye className="h-4 w-4 text-primary-600" />
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {category?.name || 'Uncategorized'}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-primary-800 line-clamp-1 mb-1">{title}</h3>
          
          <div className="flex items-center text-primary-500 text-sm mb-2">
            <MapPin className="h-4 w-4 mr-1" /> {location}
          </div>
          
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xl font-bold text-accent-700">
              {formatter.format(price)}
            </span>
            <span className="text-xs text-primary-500">Listed</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ListingCard;