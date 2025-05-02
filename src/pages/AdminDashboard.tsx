import React, { useState } from 'react';
import { Layers, Users, Settings, PlusCircle, Grid, List, CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import ListingReviewCard from '../components/admin/ListingReviewCard';
import CategoryManagement from '../components/admin/CategoryManagement';
import AgencyManagement from '../components/admin/AgencyManagement';
import { useListings } from '../contexts/ListingContext';

const AdminDashboard: React.FC = () => {
  const { listings, getListingsByStatus } = useListings();
  const [activeTab, setActiveTab] = useState('pending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const pendingListings = getListingsByStatus('pending');
  const approvedListings = getListingsByStatus('approved');
  const rejectedListings = getListingsByStatus('rejected');
  
  const displayListings = activeTab === 'pending' 
    ? pendingListings 
    : activeTab === 'approved'
      ? approvedListings
      : rejectedListings;
  
  const getListingCountText = () => {
    switch (activeTab) {
      case 'pending':
        return pendingListings.length === 1 
          ? '1 Pending Listing' 
          : `${pendingListings.length} Pending Listings`;
      case 'approved':
        return approvedListings.length === 1 
          ? '1 Approved Listing' 
          : `${approvedListings.length} Approved Listings`;
      case 'rejected':
        return rejectedListings.length === 1 
          ? '1 Rejected Listing' 
          : `${rejectedListings.length} Rejected Listings`;
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-primary-800 mb-6">Admin Dashboard</h1>
      
      {/* Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-700 mr-4">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-primary-500">Pending Listings</p>
                <p className="text-2xl font-bold text-primary-800">{pendingListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-success-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-700 mr-4">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-success-600">Approved Listings</p>
                <p className="text-2xl font-bold text-success-800">{approvedListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-error-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-error-100 text-error-700 mr-4">
                <XCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-error-600">Rejected Listings</p>
                <p className="text-2xl font-bold text-error-800">{rejectedListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <div className="flex space-x-1 border border-gray-200 rounded-lg p-1 bg-gray-50 w-fit">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                activeTab === 'pending'
                  ? 'bg-white shadow-sm text-primary-800'
                  : 'text-primary-600 hover:text-primary-800 hover:bg-white/60'
              }`}
            >
              <Clock className="h-4 w-4 mr-1.5" />
              Pending
              {pendingListings.length > 0 && (
                <span className={`ml-1.5 px-2 py-0.5 text-xs rounded-full ${
                  activeTab === 'pending'
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-primary-200 text-primary-800'
                }`}>
                  {pendingListings.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                activeTab === 'approved'
                  ? 'bg-white shadow-sm text-primary-800'
                  : 'text-primary-600 hover:text-primary-800 hover:bg-white/60'
              }`}
            >
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Approved
            </button>
            
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                activeTab === 'rejected'
                  ? 'bg-white shadow-sm text-primary-800'
                  : 'text-primary-600 hover:text-primary-800 hover:bg-white/60'
              }`}
            >
              <XCircle className="h-4 w-4 mr-1.5" />
              Rejected
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="flex border border-gray-200 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${
                viewMode === 'grid'
                  ? 'bg-gray-100 text-primary-800'
                  : 'bg-white text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${
                viewMode === 'list'
                  ? 'bg-gray-100 text-primary-800'
                  : 'bg-white text-primary-600 hover:bg-gray-50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Listings */}
      <Card className="mb-12">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h2 className="text-xl font-semibold text-primary-800">{getListingCountText()}</h2>
        </CardHeader>
        <CardContent>
          {displayListings.length > 0 ? (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {displayListings.map(listing => (
                <ListingReviewCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-primary-700 mb-2">No listings to show</p>
              <p className="text-primary-600 mb-4">
                {activeTab === 'pending'
                  ? 'There are no pending listings requiring your review.'
                  : activeTab === 'approved'
                  ? 'No listings have been approved yet.'
                  : 'No listings have been rejected.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Categories */}
      <div className="mb-12">
        <CategoryManagement />
      </div>
      
      {/* Agencies */}
      <div className="mb-12">
        <AgencyManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;