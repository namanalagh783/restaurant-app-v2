import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, MenuContextType } from '../types';

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

const initialMenuItems: MenuItem[] = [
  // Starters
  {
    id: '1',
    name: 'Royal Samosa Platter',
    description: 'Crispy golden samosas filled with spiced potatoes and served with mint chutney',
    price: 12.99,
    category: 'starter',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
    available: true,
    spiceLevel: 'medium',
    isVegetarian: true,
  },
  {
    id: '2',
    name: 'Tandoori Chicken Wings',
    description: 'Succulent chicken wings marinated in royal spices and grilled to perfection',
    price: 16.99,
    category: 'starter',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
    available: true,
    spiceLevel: 'hot',
    isVegetarian: false,
  },
  {
    id: '3',
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes with bell peppers and onions',
    price: 14.99,
    category: 'starter',
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg',
    available: true,
    spiceLevel: 'medium',
    isVegetarian: true,
  },
  // Main Course
  {
    id: '4',
    name: 'Maharaja Special Biryani',
    description: 'Aromatic basmati rice layered with tender lamb and royal spices',
    price: 28.99,
    category: 'main',
    image: 'https://images.pexels.com/photos/12737659/pexels-photo-12737659.jpeg',
    available: true,
    spiceLevel: 'medium',
    isVegetarian: false,
  },
  {
    id: '5',
    name: 'Butter Chicken',
    description: 'Creamy tomato-based curry with tender chicken pieces',
    price: 24.99,
    category: 'main',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
    available: true,
    spiceLevel: 'mild',
    isVegetarian: false,
  },
  {
    id: '6',
    name: 'Dal Maharaja',
    description: 'Rich lentil curry with a blend of aromatic spices',
    price: 18.99,
    category: 'main',
    image: 'https://images.pexels.com/photos/5560754/pexels-photo-5560754.jpeg',
    available: true,
    spiceLevel: 'mild',
    isVegetarian: true,
  },
  // Desserts
  {
    id: '7',
    name: 'Royal Kulfi',
    description: 'Traditional Indian ice cream with cardamom and pistachios',
    price: 8.99,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg',
    available: true,
    isVegetarian: true,
  },
  {
    id: '8',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings in rose-flavored sugar syrup',
    price: 9.99,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/5560748/pexels-photo-5560748.jpeg',
    available: true,
    isVegetarian: true,
  },
];

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('maharaja_menu');
    if (savedItems) {
      setMenuItems(JSON.parse(savedItems));
    } else {
      setMenuItems(initialMenuItems);
      localStorage.setItem('maharaja_menu', JSON.stringify(initialMenuItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('maharaja_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  return (
    <MenuContext.Provider value={{
      menuItems,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      toggleAvailability,
    }}>
      {children}
    </MenuContext.Provider>
  );
};