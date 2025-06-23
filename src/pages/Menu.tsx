import React, { useState } from 'react';
import { useMenu } from '../contexts/MenuContext';
import MenuCard from '../components/Menu/MenuCard';
import { Crown } from 'lucide-react';

const Menu: React.FC = () => {
  const { menuItems } = useMenu();
  const [activeCategory, setActiveCategory] = useState<'all' | 'starter' | 'main' | 'dessert'>('all');

  const categories = [
    { id: 'all', name: 'All Items', count: menuItems.length },
    { id: 'starter', name: 'Starters', count: menuItems.filter(item => item.category === 'starter').length },
    { id: 'main', name: 'Main Course', count: menuItems.filter(item => item.category === 'main').length },
    { id: 'dessert', name: 'Desserts', count: menuItems.filter(item => item.category === 'dessert').length },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Crown className="h-12 w-12 text-royal-500 mx-auto mb-4" />
          <h1 className="text-4xl font-display font-bold text-burgundy-800 mb-4">
            Royal Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Indian dishes, 
            each prepared with the finest ingredients and traditional cooking methods.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-royal-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-burgundy-800 hover:bg-royal-50 shadow-md hover:shadow-lg'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No items found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-burgundy-700 to-burgundy-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-display font-bold mb-4">
            Ready to Experience Royal Dining?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Book your table now and let us serve you like royalty
          </p>
          <a
            href="/booking"
            className="inline-block px-8 py-4 bg-royal-500 hover:bg-royal-600 text-burgundy-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Reserve Your Table
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;