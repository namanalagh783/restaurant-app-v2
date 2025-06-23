import React, { useState } from 'react';
import { Calendar, Clock, Users, MessageSquare } from 'lucide-react';
import { useBooking } from '../../contexts/BookingContext';
import { useAuth } from '../../contexts/AuthContext';

const BookingForm: React.FC = () => {
  const { addBooking } = useBooking();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const timeSlots = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
    '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addBooking({
      userId: user.id,
      userName: formData.name,
      userEmail: formData.email,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
      specialRequests: formData.specialRequests,
      status: 'pending',
    });

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form
    setFormData({
      name: user.name,
      email: user.email,
      date: '',
      time: '',
      guests: 2,
      specialRequests: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
  };

  const today = new Date().toISOString().split('T')[0];

  if (showSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-green-800 mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-green-700 mb-6">
          Your table reservation has been submitted successfully. We'll contact you shortly to confirm your booking.
        </p>
        <button
          onClick={() => setShowSuccess(false)}
          className="px-6 py-3 bg-royal-500 hover:bg-royal-600 text-white rounded-lg font-medium transition-colors"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8 text-yellow-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-yellow-800 mb-2">
          Please Sign In
        </h3>
        <p className="text-yellow-700 mb-6">
          You need to be signed in to make a table reservation.
        </p>
        <div className="space-x-4">
          <a
            href="/login"
            className="inline-block px-6 py-3 bg-royal-500 hover:bg-royal-600 text-white rounded-lg font-medium transition-colors"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="inline-block px-6 py-3 border border-royal-500 text-royal-600 hover:bg-royal-50 rounded-lg font-medium transition-colors"
          >
            Create Account
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
            placeholder="Enter your email"
          />
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Reservation Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={today}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
          />
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Preferred Time
          </label>
          <select
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
          >
            <option value="">Select a time</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Number of Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>

        {/* Special Requests */}
        <div className="md:col-span-2">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-1" />
            Special Requests (Optional)
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-500 focus:border-royal-500 transition-colors resize-none"
            placeholder="Any dietary restrictions, special occasions, or other requests..."
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-8 py-4 bg-royal-500 hover:bg-royal-600 disabled:bg-royal-300 text-white font-semibold rounded-lg transition-colors transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Reserve Table'}
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>We'll contact you within 24 hours to confirm your reservation.</p>
      </div>
    </form>
  );
};

export default BookingForm;