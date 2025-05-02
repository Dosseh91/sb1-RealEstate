import React, { useState } from 'react';
import { CheckCircle, XCircle, Eye, MessageCircle } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../common/Card';
import Button from '../common/Button';
import { Agency } from '../../types';
import { agencies as mockAgencies } from '../../data/mockData';

const AgencyManagement: React.FC = () => {
  const [agencies, setAgencies] = useState<Agency[]>(mockAgencies);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);

  const handleVerifyAgency = (id: string) => {
    setAgencies(
      agencies.map(agency =>
        agency.id === id ? { ...agency, verified: true } : agency
      )
    );
  };

  const handleRevokeVerification = (id: string) => {
    setAgencies(
      agencies.map(agency =>
        agency.id === id ? { ...agency, verified: false } : agency
      )
    );
  };

  const handleViewDetails = (agency: Agency) => {
    setSelectedAgency(agency);
    setIsViewingDetails(true);
  };

  const handleCloseDetails = () => {
    setIsViewingDetails(false);
    setSelectedAgency(null);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-primary-800">Agency Management</h2>
      </CardHeader>
      <CardContent>
        {isViewingDetails && selectedAgency ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-primary-800">
                Agency Details
              </h3>
              <Button variant="outline" size="sm" onClick={handleCloseDetails}>
                Back to List
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {selectedAgency.logo ? (
                    <img 
                      src={selectedAgency.logo} 
                      alt={selectedAgency.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Logo
                    </div>
                  )}
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">Status:</span>
                    <span className={`text-sm font-medium ${selectedAgency.verified ? 'text-success-600' : 'text-warning-600'}`}>
                      {selectedAgency.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">ID:</span>
                    <span className="text-sm">{selectedAgency.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">User ID:</span>
                    <span className="text-sm">{selectedAgency.userId}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  {selectedAgency.verified ? (
                    <Button 
                      variant="error" 
                      size="sm" 
                      fullWidth
                      onClick={() => handleRevokeVerification(selectedAgency.id)}
                      icon={<XCircle className="h-4 w-4" />}
                    >
                      Revoke Verification
                    </Button>
                  ) : (
                    <Button 
                      variant="success" 
                      size="sm" 
                      fullWidth
                      onClick={() => handleVerifyAgency(selectedAgency.id)}
                      icon={<CheckCircle className="h-4 w-4" />}
                    >
                      Verify Agency
                    </Button>
                  )}
                  
                  <Button 
                    variant="primary" 
                    size="sm" 
                    fullWidth
                    icon={<MessageCircle className="h-4 w-4" />}
                  >
                    Contact Agency
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="text-lg font-medium text-primary-800 mb-4">
                  {selectedAgency.name}
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-primary-700 mb-1">Description</h5>
                    <p className="text-primary-600">{selectedAgency.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-primary-700 mb-1">Contact Information</h5>
                      <ul className="space-y-2">
                        <li className="flex">
                          <span className="text-sm text-primary-600 w-20">Email:</span>
                          <span className="text-sm">{selectedAgency.email}</span>
                        </li>
                        <li className="flex">
                          <span className="text-sm text-primary-600 w-20">Phone:</span>
                          <span className="text-sm">{selectedAgency.phone}</span>
                        </li>
                        <li className="flex">
                          <span className="text-sm text-primary-600 w-20">Website:</span>
                          <span className="text-sm">
                            {selectedAgency.website ? (
                              <a 
                                href={selectedAgency.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-accent-600 hover:underline"
                              >
                                {selectedAgency.website}
                              </a>
                            ) : (
                              'N/A'
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-primary-700 mb-1">Address</h5>
                      <p className="text-sm text-primary-600">{selectedAgency.address}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-primary-700 mb-2">Verification Notes</h5>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                      rows={4}
                      placeholder="Add notes about verification process..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-sm font-semibold text-primary-700">Agency</th>
                  <th className="px-4 py-3 text-sm font-semibold text-primary-700">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-primary-700">Phone</th>
                  <th className="px-4 py-3 text-sm font-semibold text-primary-700">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold text-primary-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agencies.map(agency => (
                  <tr 
                    key={agency.id} 
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100 mr-3">
                          {agency.logo ? (
                            <img 
                              src={agency.logo} 
                              alt={agency.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div>
                          <p className="font-medium text-primary-800">{agency.name}</p>
                          <p className="text-xs text-primary-500">{agency.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-primary-600">
                      {agency.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-primary-600">
                      {agency.phone}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          agency.verified
                            ? 'bg-success-50 text-success-700'
                            : 'bg-warning-50 text-warning-700'
                        }`}
                      >
                        {agency.verified ? 'Verified' : 'Unverified'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(agency)}
                          className="p-1"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4 text-primary-600" />
                        </Button>
                        
                        {agency.verified ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRevokeVerification(agency.id)}
                            className="p-1"
                            title="Revoke Verification"
                          >
                            <XCircle className="h-4 w-4 text-error-500" />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleVerifyAgency(agency.id)}
                            className="p-1"
                            title="Verify Agency"
                          >
                            <CheckCircle className="h-4 w-4 text-success-500" />
                          </Button>
                        )}
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="p-1"
                          title="Contact Agency"
                        >
                          <MessageCircle className="h-4 w-4 text-accent-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AgencyManagement;