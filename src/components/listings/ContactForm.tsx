import React, { useState } from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import Card, { CardContent, CardHeader } from '../common/Card';
import Button from '../common/Button';
import { Listing } from '../../types';
import { generateId, getCurrentTimestamp } from '../../data/mockData';

interface ContactFormProps {
  listing: Listing;
}

const ContactForm: React.FC<ContactFormProps> = ({ listing }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would send this data to the server
      const message = {
        id: generateId(),
        listingId: listing.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        agencyId: listing.agencyId,
        createdAt: getCurrentTimestamp(),
        read: false,
      };
      
      console.log('Sending message:', message);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 5000);
    }, 1000);
  };

  return (
    <Card className="sticky top-4 w-full">
      <CardHeader className="bg-primary-50">
        <h3 className="text-lg font-semibold text-primary-800">
          Contact About This Listing
        </h3>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-50 text-success-500 mb-4">
              <Send className="h-8 w-8" />
            </div>
            <h4 className="text-xl font-semibold text-primary-800 mb-2">Message Sent!</h4>
            <p className="text-primary-600">
              Thank you for your inquiry. The agency will get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">
                  Your Name <span className="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-error-500 focus:ring-error-500' : 'border-gray-300 focus:ring-accent-500'
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-error-500">{errors.name}</p>}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                  Email Address <span className="text-error-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-error-500 focus:ring-error-500' : 'border-gray-300 focus:ring-accent-500'
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-error-500">{errors.email}</p>}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary-700 mb-1">
                  Phone Number (optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-primary-700 mb-1">
                  Message <span className="text-error-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.message ? 'border-error-500 focus:ring-error-500' : 'border-gray-300 focus:ring-accent-500'
                  }`}
                  placeholder="I'm interested in this listing..."
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-error-500">{errors.message}</p>}
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="secondary"
                  fullWidth 
                  disabled={isSubmitting}
                  className="group"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-primary-500 text-center mt-4">
                By sending a message, you agree to our <a href="#" className="text-accent-600 hover:underline">Terms of Service</a> and <a href="#" className="text-accent-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactForm;