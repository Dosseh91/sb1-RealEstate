import React, { useState } from 'react';
import { FileUp, Plus, Save, Trash2 } from 'lucide-react';
import Card, { CardContent, CardHeader, CardFooter } from '../common/Card';
import Button from '../common/Button';
import { Listing, Category } from '../../types';
import { useListings } from '../../contexts/ListingContext';
import { categories, findAgencyByUserId } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

interface ListingFormProps {
  initialListing?: Listing;
  onSuccess?: () => void;
}

const ListingForm: React.FC<ListingFormProps> = ({ initialListing, onSuccess }) => {
  const { user } = useAuth();
  const { addListing, updateListing } = useListings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const agency = user ? findAgencyByUserId(user.id) : null;
  
  const [formData, setFormData] = useState<Partial<Listing>>(
    initialListing || {
      title: '',
      description: '',
      price: 0,
      images: [],
      categoryId: '',
      location: '',
      status: 'pending',
      agencyId: agency?.id || '',
    }
  );
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tempImageUrl, setTempImageUrl] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const addImage = () => {
    if (tempImageUrl && !formData.images?.includes(tempImageUrl)) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), tempImageUrl],
      });
      setTempImageUrl('');
    }
  };

  const removeImage = (url: string) => {
    setFormData({
      ...formData,
      images: formData.images?.filter(image => image !== url) || [],
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title?.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Category is required';
    }
    
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.images?.length) {
      newErrors.images = 'At least one image is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      if (initialListing) {
        await updateListing(formData as Listing);
      } else {
        await addListing(formData as Omit<Listing, 'id' | 'createdAt' | 'updatedAt'>);
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to save listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold text-primary-800">
          {initialListing ? 'Edit Listing' : 'Create New Listing'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-primary-700 mb-1">
                  Title <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.title
                      ? 'border-error-500 focus:ring-error-500'
                      : 'border-gray-300 focus:ring-accent-500'
                  }`}
                  placeholder="Enter a descriptive title"
                />
                {errors.title && <p className="mt-1 text-sm text-error-500">{errors.title}</p>}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-1">
                  Description <span className="text-error-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.description
                      ? 'border-error-500 focus:ring-error-500'
                      : 'border-gray-300 focus:ring-accent-500'
                  }`}
                  placeholder="Provide a detailed description of your listing"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-error-500">{errors.description}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-primary-700 mb-1">
                    Price ($) <span className="text-error-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.price
                        ? 'border-error-500 focus:ring-error-500'
                        : 'border-gray-300 focus:ring-accent-500'
                    }`}
                  />
                  {errors.price && <p className="mt-1 text-sm text-error-500">{errors.price}</p>}
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-primary-700 mb-1">
                    Category <span className="text-error-500">*</span>
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId || ''}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.categoryId
                        ? 'border-error-500 focus:ring-error-500'
                        : 'border-gray-300 focus:ring-accent-500'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="mt-1 text-sm text-error-500">{errors.categoryId}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-primary-700 mb-1">
                  Location <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.location
                      ? 'border-error-500 focus:ring-error-500'
                      : 'border-gray-300 focus:ring-accent-500'
                  }`}
                  placeholder="City, State or Online"
                />
                {errors.location && <p className="mt-1 text-sm text-error-500">{errors.location}</p>}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Images <span className="text-error-500">*</span>
                </label>
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={tempImageUrl}
                        onChange={(e) => setTempImageUrl(e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addImage}
                        disabled={!tempImageUrl}
                        icon={<Plus className="h-4 w-4" />}
                      >
                        Add
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-primary-500">
                      For this demo, please paste image URLs directly. In a real app, we would have file uploads.
                    </p>
                  </div>

                  {formData.images && formData.images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Listing image ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(image)}
                            className="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-error-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                      <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-center text-primary-500">
                        No images added yet. Add image URLs above.
                      </p>
                    </div>
                  )}
                  {errors.images && <p className="mt-1 text-sm text-error-500">{errors.images}</p>}
                </div>
              </div>

              <div className="border rounded-md p-4 bg-primary-50">
                <h3 className="text-sm font-medium text-primary-800 mb-2">Listing Information</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-primary-600">Status:</span>
                    <span className="font-medium">
                      {initialListing ? initialListing.status : 'Will be submitted as Pending'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-primary-600">Agency:</span>
                    <span className="font-medium">{agency?.name || 'Unknown'}</span>
                  </li>
                  {initialListing && (
                    <>
                      <li className="flex justify-between">
                        <span className="text-primary-600">Created:</span>
                        <span>{new Date(initialListing.createdAt).toLocaleDateString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-primary-600">Last Updated:</span>
                        <span>{new Date(initialListing.updatedAt).toLocaleDateString()}</span>
                      </li>
                    </>
                  )}
                </ul>
                <div className="mt-4 pt-4 border-t border-primary-200">
                  <p className="text-xs text-primary-600">
                    All listings require admin approval before they appear online. You'll be notified when your listing is approved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess && onSuccess()}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleSubmit}
          disabled={isSubmitting}
          icon={<Save className="h-4 w-4" />}
        >
          {isSubmitting
            ? 'Saving...'
            : initialListing
            ? 'Update Listing'
            : 'Create Listing'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListingForm;