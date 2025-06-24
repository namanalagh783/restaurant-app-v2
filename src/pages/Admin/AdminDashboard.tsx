import React, { useState } from 'react';
import { Crown, Plus, Edit, Trash2, Calendar, Users, ChefHat, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useMenu } from '../../contexts/MenuContext';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';
import { MenuItem } from '../../types';

const AdminDashboard: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleAvailability } = useMenu();
  const { bookings, updateBookingStatus } = useBooking();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'menu' | 'bookings' | 'add-item'>('menu');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'starter' as MenuItem['category'],
    image: '',
    spiceLevel: 'mild' as MenuItem['spiceLevel'],
    isVegetarian: false,
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    addMenuItem({
      ...newItem,
      price: parseFloat(newItem.price),
      available: true,
    });
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'starter',
      image: '',
      spiceLevel: 'mild',
      isVegetarian: false,
    });
    setShowAddForm(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
      spiceLevel: item.spiceLevel || 'mild',
      isVegetarian: item.isVegetarian || false,
    });
    setShowAddForm(true);
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMenuItem(editingItem.id, {
        ...newItem,
        price: parseFloat(newItem.price),
      });
      setEditingItem(null);
      setShowAddForm(false);
      setNewItem({
        name: '',
        description: '',
        price: '',
        category: 'starter',
        image: '',
        spiceLevel: 'mild',
        isVegetarian: false,
      });
    }
  };

  const stats = {
    totalItems: menuItems.length,
    availableItems: menuItems.filter(item => item.available).length,
    pendingBookings: bookings.filter(booking => booking.status === 'pending').length,
    confirmedBookings: bookings.filter(booking => booking.status === 'confirmed').length,
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Crown className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-burgundy-800 to-burgundy-600 rounded-lg p-8 mb-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="h-10 w-10 text-royal-300" />
            <div>
              <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
              <p className="text-burgundy-200">Welcome back, {user.name}</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-burgundy-700 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <ChefHat className="h-6 w-6 text-royal-300" />
                <div>
                  <p className="text-sm text-burgundy-200">Total Items</p>
                  <p className="text-2xl font-bold">{stats.totalItems}</p>
                </div>
              </div>
            </div>
            <div className="bg-burgundy-700 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-burgundy-200">Available</p>
                  <p className="text-2xl font-bold">{stats.availableItems}</p>
                </div>
              </div>
            </div>
            <div className="bg-burgundy-700 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-6 w-6 text-yellow-400" />
                <div>
                  <p className="text-sm text-burgundy-200">Pending</p>
                  <p className="text-2xl font-bold">{stats.pendingBookings}</p>
                </div>
              </div>
            </div>
            <div className="bg-burgundy-700 bg-opacity-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm text-burgundy-200">Confirmed</p>
                  <p className="text-2xl font-bold">{stats.confirmedBookings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('menu')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'menu'
                    ? 'border-royal-500 text-royal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Menu Management
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'bookings'
                    ? 'border-royal-500 text-royal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Booking Management
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Menu Management */}
            {activeTab === 'menu' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-display font-semibold text-burgundy-800">Menu Items</h2>
                  <button
                    onClick={() => {
                      setShowAddForm(true);
                      setEditingItem(null);
                      setNewItem({
                        name: '',
                        description: '',
                        price: '',
                        category: 'starter',
                        image: '',
                        spiceLevel: 'mild',
                        isVegetarian: false,
                      });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-royal-500 hover:bg-royal-600 text-white rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add New Item</span>
                  </button>
                </div>

                {/* Add/Edit Form */}
                {showAddForm && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-burgundy-800 mb-4">
                      {editingItem ? 'Edit Item' : 'Add New Item'}
                    </h3>
                    <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-500 focus:border-royal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newItem.price}
                          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-500 focus:border-royal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                          value={newItem.category}
                          onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem['category'] })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-500 focus:border-royal-500"
                        >
                          <option value="starter">Starter</option>
                          <option value="main">Main Course</option>
                          <option value="dessert">Dessert</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Spice Level</label>
                        <select
                          value={newItem.spiceLevel}
                          onChange={(e) => setNewItem({ ...newItem, spiceLevel: e.target.value as MenuItem['spiceLevel'] })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-500 focus:border-royal-500"
                        >
                          <option value="mild">Mild</option>
                          <option value="medium">Medium</option>
                          <option value="hot">Hot</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={newItem.description}
                          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                          required
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-500 focus:border-royal-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                          type="url"
                          value={newItem.image}
                          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-royal-500 focus:border-royal-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={newItem.isVegetarian}
                            onChange={(e) => setNewItem({ ...newItem, isVegetarian: e.target.checked })}
                            className="rounded border-gray-300 text-royal-600 focus:ring-royal-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Vegetarian</span>
                        </label>
                      </div>
                      <div className="md:col-span-2 flex space-x-4">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-royal-500 hover:bg-royal-600 text-white rounded-md transition-colors"
                        >
                          {editingItem ? 'Update Item' : 'Add Item'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddForm(false);
                            setEditingItem(null);
                          }}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Menu Items Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {menuItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img className="h-12 w-12 rounded-full object-cover mr-4" src={item.image} alt={item.name} />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">{item.description.substring(0, 50)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-royal-100 text-royal-800 capitalize">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ₹{item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={() => toggleAvailability(item.id)}
                              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                item.available
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }`}
                            >
                              {item.available ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  <span>Available</span>
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4" />
                                  <span>Unavailable</span>
                                </>
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEditItem(item)}
                              className="text-royal-600 hover:text-royal-900 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Booking Management */}
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-2xl font-display font-semibold text-burgundy-800 mb-6">Booking Management</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.userName}</div>
                              <div className="text-sm text-gray-500">{booking.userEmail}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-1" />
                              <span className="text-sm text-gray-900">{booking.guests}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900 transition-colors"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-900 transition-colors"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;