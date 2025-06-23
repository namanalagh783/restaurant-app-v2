import React from 'react';
import { Flame, Leaf } from 'lucide-react';
import { MenuItem } from '../../types';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const getSpiceIcon = (level?: string) => {
    if (!level) return null;
    const flames = level === 'hot' ? 3 : level === 'medium' ? 2 : 1;
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: flames }).map((_, i) => (
          <Flame key={i} className="w-4 h-4 text-red-500" />
        ))}
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
      !item.available ? 'opacity-60' : ''
    }`}>
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Currently Unavailable</span>
          </div>
        )}
        <div className="absolute top-4 right-4 flex space-x-2">
          {item.isVegetarian && (
            <div className="bg-green-500 rounded-full p-2">
              <Leaf className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-display font-semibold text-burgundy-800">
            {item.name}
          </h3>
          <span className="text-2xl font-bold text-royal-600">
            ${item.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {item.spiceLevel && getSpiceIcon(item.spiceLevel)}
            {item.spiceLevel && (
              <span className="text-sm text-gray-500 capitalize">
                {item.spiceLevel}
              </span>
            )}
          </div>
          
          {item.available && (
            <button className="px-4 py-2 bg-royal-500 hover:bg-royal-600 text-white rounded-md transition-colors font-medium">
              Add to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;