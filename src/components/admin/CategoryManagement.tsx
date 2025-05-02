import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';
import Button from '../common/Button';
import Card, { CardContent, CardHeader } from '../common/Card';
import { Category } from '../../types';
import { categories as mockCategories, generateId } from '../../data/mockData';

const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    description: '',
    icon: 'tag',
    slug: '',
  });

  const handleAddCategory = () => {
    setIsAddingCategory(true);
    setNewCategory({
      name: '',
      description: '',
      icon: 'tag',
      slug: '',
    });
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategoryId(category.id);
    setNewCategory({ ...category });
  };

  const handleCancelEdit = () => {
    setIsAddingCategory(false);
    setEditingCategoryId(null);
  };

  const handleSaveCategory = () => {
    if (!newCategory.name || !newCategory.description) {
      return;
    }

    if (isAddingCategory) {
      const slug = newCategory.name?.toLowerCase().replace(/\s+/g, '-') || '';
      const category: Category = {
        id: generateId(),
        name: newCategory.name || '',
        description: newCategory.description || '',
        icon: newCategory.icon || 'tag',
        slug,
      };
      setCategories([...categories, category]);
      setIsAddingCategory(false);
    } else if (editingCategoryId) {
      setCategories(
        categories.map(cat =>
          cat.id === editingCategoryId
            ? { ...cat, ...newCategory, slug: newCategory.slug || cat.slug }
            : cat
        )
      );
      setEditingCategoryId(null);
    }
  };

  const handleDeleteCategory = (id: string) => {
    // In a real app, we would check if there are any listings using this category
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const iconOptions = [
    'tag', 'home', 'car', 'smartphone', 'briefcase', 'shopping-bag', 
    'package', 'gift', 'coffee', 'music', 'book', 'camera', 'heart',
    'user', 'users', 'star', 'globe', 'map-pin', 'flag', 'bell'
  ];

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary-800">Category Management</h2>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={handleAddCategory}
          icon={<PlusCircle className="h-4 w-4" />}
        >
          Add Category
        </Button>
      </CardHeader>
      <CardContent>
        {(isAddingCategory || editingCategoryId) && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50 animate-fade-in">
            <h3 className="text-lg font-medium text-primary-800 mb-4">
              {isAddingCategory ? 'Add New Category' : 'Edit Category'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCategory.name || ''}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-primary-700 mb-1">
                  Icon
                </label>
                <select
                  id="icon"
                  name="icon"
                  value={newCategory.icon || 'tag'}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>
                      {icon.charAt(0).toUpperCase() + icon.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-primary-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newCategory.description || ''}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500"
                ></textarea>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCancelEdit}
                icon={<X className="h-4 w-4" />}
              >
                Cancel
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleSaveCategory}
                icon={<Save className="h-4 w-4" />}
              >
                Save
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-sm font-semibold text-primary-700">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-primary-700">Description</th>
                <th className="px-4 py-3 text-sm font-semibold text-primary-700">Icon</th>
                <th className="px-4 py-3 text-sm font-semibold text-primary-700">Slug</th>
                <th className="px-4 py-3 text-sm font-semibold text-primary-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr 
                  key={category.id} 
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-primary-800">{category.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-primary-600">
                    {category.description}
                  </td>
                  <td className="px-4 py-3 text-sm text-primary-600">
                    {category.icon}
                  </td>
                  <td className="px-4 py-3 text-sm text-primary-600">
                    {category.slug}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                        className="p-1"
                      >
                        <Edit className="h-4 w-4 text-primary-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-1"
                      >
                        <Trash2 className="h-4 w-4 text-error-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManagement;