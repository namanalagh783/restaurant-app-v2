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
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg',
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
    image: 'https://images.pexels.com/photos/3928854/pexels-photo-3928854.png',
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
    image: 'https://images.pexels.com/photos/17649369/pexels-photo-17649369.jpeg',
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
    image: 'https://images.pexels.com/photos/9609844/pexels-photo-9609844.jpeg',
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
    image: 'https://images.pexels.com/photos/12737916/pexels-photo-12737916.jpeg',
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
    image: 'https://imgs.search.brave.com/7YAeRRwM2-QhyfVPI5InJyE6zVDWpHkuDt1RjkGk-xQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ5/NTI4NTE0NC9waG90/by9zaGFoaS1rdWxm/aS1vci1rdWxmaS1p/bmNsdWRlLWtob3lh/LW1pbGstYmFkYW0t/YWxtb25kLXdpdGgt/c3RpY2stc2VydmVk/LWluLWRpc2gtaXNv/bGF0ZWQtb24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPS04/RXdrYlRtMHVKRVhx/OUxKdEZuNThKQWtV/WUlwSlVSbGwtVXhp/eDhNM009',
    available: true,
    isVegetarian: true,
  },
  {
    id: '8',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings in rose-flavored sugar syrup',
    price: 9.99,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/7449105/pexels-photo-7449105.jpeg',
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