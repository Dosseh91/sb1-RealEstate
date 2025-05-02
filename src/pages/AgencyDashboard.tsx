import React, { useState } from 'react';
import { PlusCircle, LayoutGrid, Package, MessageCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import ListingCard from '../components/listings/ListingCard';
import ListingForm from '../components/agency/ListingForm';
import MessageList from '../components/agency/MessageList';
import { useAuth } from '../contexts/AuthContext';
import { useListings } from '../contexts/ListingContext';
import { findAgencyByUserId } from '../data/mockData';

const AgencyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getListingsByAgency } = useListings();
  const [activeTab, setActiveTab] = useState('listings');
  const [isCreatingListing, setIsCreatingListing] = useState(false);
  const [editingListing, setEditingListing] = useState<string | null>(null);
  
  // Find agency by user ID
  const agency = user ? findAgencyByUserId(user.id) : null;
  
  // Get agency listings
  const agencyListings = agency ? getListingsByAgency(agency.id) : [];
  
  // Count listings by status
  const pendingCount = agencyListings.filter(l => l.status === 'pending').length;
  const approvedCount = agencyListings.filter(l => l.status === 'approved').length;
  const rejectedCount = agencyListings.filter(l => l.status === 'rejected').length;
  
  const handleEditComplete = () => {
    setIsCreatingListing(false);
    setEditingListing(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary-800 mb-4 md:mb-0">{agency?.name} Dashboard</h1>
        {activeTab === 'listings' && !isCreatingListing && !editingListing && (
          <Button 
            variant="secondary" 
            onClick={() => setIsCreatingListing(true)}
            icon={<PlusCircle className="h-4 w-4" />}
          >
            Create New Listing
          </Button>
        )}
      </div>
      
      {/* Agency stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-700 mr-4">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-primary-500">Total Listings</p>
                <p className="text-2xl font-bold text-primary-800">{agencyListings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-warning-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-700 mr-4">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-warning-600">Pending</p>
                <p className="text-2xl font-bold text-warning-800">{pendingCount}</p>
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
                <p className="text-sm text-success-600">Approved</p>
                <p className="text-2xl font-bold text-success-800">{approvedCount}</p>
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
                <p className="text-sm text-error-600">Rejected</p>
                <p className="text-2xl font-bold text-error-800">{rejectedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      {!isCreatingListing && !editingListing && (
        <div className="flex space-x-1 border border-gray-200 rounded-lg p-1 bg-gray-50 w-fit mb-6">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
              activeTab === 'listings'
                ? 'bg-white shadow-sm text-primary-800'
                : 'text-primary-600 hover:text-primary-800 hover:bg-white/60'
            }`}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            Listings
          </button>
          
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
              activeTab === 'messages'
                ? 'bg-white shadow-sm text-primary-800'
                : 'text-primary-600 hover:text-primary-800 hover:bg-white/60'
            }`}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Messages
          </button>
        </div>
      )}
      
      {/* Content based on tab */}
      {activeTab === 'listings' && (
        <>
          {isCreatingListing ? (
            <ListingForm onSuccess={handleEditComplete} />
          ) : editingListing ? (
            <ListingForm 
              initialListing={agencyListings.find(l => l.id === editingListing)}
              onSuccess={handleEditComplete}
            />
          ) : (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-primary-800">My Listings</h2>
              </CardHeader>
              <CardContent>
                {agencyListings.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agencyListings.map(listing => (
                      <div key={listing.id} className="relative">
                        <ListingCard listing={listing} showStatus />
                        <div className="absolute top-2 left-2 flex space-x-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="px-2 py-1 bg-white bg-opacity-90 hover:bg-opacity-100"
                            onClick={() => setEditingListing(listing.id)}
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-primary-700 mb-2">No listings yet</p>
                    <p className="text-primary-600 mb-4">
                      You haven't created any listings yet. Get started by creating your first listing.
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => setIsCreatingListing(true)}
                      icon={<PlusCircle className="h-4 w-4" />}
                    >
                      Create New Listing
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
      
      {activeTab === 'messages' && (
        <MessageList />
      )}
    </div>
  );
};

export default AgencyDashboard;