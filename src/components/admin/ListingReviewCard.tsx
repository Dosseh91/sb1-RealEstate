import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardFooter } from '../common/Card';
import Button from '../common/Button';
import StatusBadge from '../common/StatusBadge';
import { Listing } from '../../types';
import { getCategoryById } from '../../data/mockData';
import { useListings } from '../../contexts/ListingContext';

interface ListingReviewCardProps {
  listing: Listing;
}

const ListingReviewCard: React.FC<ListingReviewCardProps> = ({ listing }) => {
  const { updateListingStatus } = useListings();
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  const category = getCategoryById(listing.categoryId);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });

  const handleApprove = async () => {
    setIsUpdating(true);
    try {
      await updateListingStatus(listing.id, 'approved');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReject = async () => {
    if (!showRejectReason) {
      setShowRejectReason(true);
      return;
    }
    
    if (!rejectReason.trim()) {
      return;
    }
    
    setIsUpdating(true);
    try {
      await updateListingStatus(listing.id, 'rejected');
      // In a real app, we would save the rejection reason as well
      console.log(`Rejection reason for listing ${listing.id}: ${rejectReason}`);
    } finally {
      setIsUpdating(false);
      setShowRejectReason(false);
      setRejectReason('');
    }
  };

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img 
            src={listing.images[0] || 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
            alt={listing.title}
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="absolute top-2 right-2">
          <StatusBadge status={listing.status} />
        </div>
      </div>
      
      <CardContent>
        <div className="mb-2">
          <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {category?.name || 'Uncategorized'}
          </span>
          <span className="inline-block ml-2 text-primary-500 text-xs">
            ID: {listing.id.substring(0, 6)}...
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-primary-800 mb-1">{listing.title}</h3>
        
        <p className="text-primary-600 text-sm mb-3 line-clamp-2">
          {listing.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-accent-700">
            {formatter.format(listing.price)}
          </span>
          <Link to={`/listings/${listing.id}`} className="text-accent-600 hover:text-accent-800 flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span className="text-sm">View</span>
          </Link>
        </div>
        
        {showRejectReason && (
          <div className="mt-2 mb-4 animate-fade-in">
            <label htmlFor="rejectReason" className="block text-sm font-medium text-primary-700 mb-1">
              Reason for rejection
            </label>
            <textarea
              id="rejectReason"
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-error-500"
              rows={3}
              placeholder="Please provide a reason for rejection..."
            ></textarea>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {listing.status === 'pending' && (
          <>
            <Button
              variant="success"
              size="sm"
              disabled={isUpdating}
              onClick={handleApprove}
              icon={<CheckCircle className="w-4 h-4" />}
            >
              Approve
            </Button>
            <Button
              variant="error"
              size="sm"
              disabled={isUpdating}
              onClick={handleReject}
              icon={<XCircle className="w-4 h-4" />}
            >
              {showRejectReason ? 'Submit Rejection' : 'Reject'}
            </Button>
          </>
        )}
        {listing.status !== 'pending' && (
          <>
            <Button
              variant="outline"
              size="sm"
              icon={<MessageCircle className="w-4 h-4" />}
            >
              Contact Agency
            </Button>
            <Button
              variant={listing.status === 'rejected' ? 'outline' : 'primary'}
              size="sm"
              onClick={() => updateListingStatus(listing.id, 'pending')}
            >
              Reset Status
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ListingReviewCard;