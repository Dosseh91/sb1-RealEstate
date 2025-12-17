import React, { useState } from 'react';
import { Layers, Users, Settings, PlusCircle, Grid, List, CheckCircle, XCircle, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import Card, { CardContent, CardHeader } from '../components/common/Card';
import ListingReviewCard from '../components/admin/ListingReviewCard';
import CategoryManagement from '../components/admin/CategoryManagement';
import AgencyManagement from '../components/admin/AgencyManagement';
import { useListings } from '../contexts/ListingContext';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  description?: string;
}

const categories: Category[] = [
  { id: 'apartments', name: 'Apartments' },
  { id: 'houses', name: 'Houses' },
  { id: 'commercial', name: 'Commercial' },
  { id: 'land', name: 'Land' },
  { id: 'luxury', name: 'Luxury' }
];

const Categories = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Categories</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1.5rem'
        }}
      >
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            style={{
              textDecoration: 'none',
              border: '1px solid #e5e7eb',
              padding: '1rem',
              borderRadius: '8px',
              color: 'inherit'
            }}
          >
            <h3>{category.name}</h3>
            {category.description && <p>{category.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;

