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
    price: 479,
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
    price: 759,
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
    price: 629,
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
    price: 1259,
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
    price: 1379,
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
    price: 1039,
    category: 'main',
    image: 'https://images.pexels.com/photos/12737916/pexels-photo-12737916.jpeg',
    available: true,
    spiceLevel: 'mild',
    isVegetarian: true,
  },
  {
    id: '7',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken in a rich, creamy tomato and spice sauce',
    price: 1429,
    category: 'main',
    image: 'https://images.pexels.com/photos/9609834/pexels-photo-9609834.jpeg',
    available: true,
    spiceLevel: 'medium',
    isVegetarian: false,
  },
  {
    id: '8',
    name: 'Palak Paneer',
    description: 'Fresh cottage cheese in a creamy spinach curry',
    price: 1159,
    category: 'main',
    image: 'https://images.pexels.com/photos/31249589/pexels-photo-31249589.jpeg',
    available: true,
    spiceLevel: 'mild',
    isVegetarian: true,
  },
  // Desserts
  {
    id: '9',
    name: 'Royal Kulfi',
    description: 'Traditional Indian ice cream with cardamom and pistachios',
    price: 559,
    category: 'dessert',
    image: 'https://media.istockphoto.com/id/1495285144/photo/shahi-kulfi-or-kulfi-include-khoya-milk-badam-almond-with-stick-served-in-dish-isolated-on.jpg?s=612x612&w=is&k=20&c=n8ssvyNHmUU26M4OYtQwaHtaRpbK_i1VmCyH2_8CGIg=',
    available: true,
    isVegetarian: true,
  },
  {
    id: '10',
    name: 'Gulab Jamun',
    description: 'Soft milk dumplings in rose-flavored sugar syrup',
    price: 329,
    category: 'dessert',
    image: 'https://images.pexels.com/photos/7449105/pexels-photo-7449105.jpeg',
    available: true,
    isVegetarian: true,
  },
  {
    id: '11',
    name: 'Ras Malai',
    description: 'Delicate cottage cheese dumplings in sweetened milk',
    price: 659,
    category: 'dessert',
    image: 'https://media.istockphoto.com/id/514481051/photo/rasmalai-a-bengali-dessert-with-paneer-cheese.jpg?s=612x612&w=is&k=20&c=VGdDZTW6LBV7nBXkb1TFJCNf-v5ept5aHM3QoEYvtQQ=',
    available: true,
    isVegetarian: true,
  },
];

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);

  useEffect(() => {
    // Try to load from localStorage, but always ensure we have default items
    const savedItems = localStorage.getItem('maharaja_menu');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        if (Array.isArray(parsedItems) && parsedItems.length > 0) {
          setMenuItems(parsedItems);
        } else {
          // If saved items are empty or invalid, use initial items
          setMenuItems(initialMenuItems);
          localStorage.setItem('maharaja_menu', JSON.stringify(initialMenuItems));
        }
      } catch (error) {
        // If parsing fails, use initial items
        console.error('Error parsing saved menu items:', error);
        setMenuItems(initialMenuItems);
        localStorage.setItem('maharaja_menu', JSON.stringify(initialMenuItems));
      }
    } else {
      // No saved items, use initial items
      setMenuItems(initialMenuItems);
      localStorage.setItem('maharaja_menu', JSON.stringify(initialMenuItems));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever menuItems changes
    if (menuItems.length > 0) {
      localStorage.setItem('maharaja_menu', JSON.stringify(menuItems));
    }
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