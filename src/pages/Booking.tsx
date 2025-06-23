import React from 'react';
import { Crown, Clock, MapPin, Phone } from 'lucide-react';
import BookingForm from '../components/Booking/BookingForm';

const Booking: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Crown className="h-12 w-12 text-royal-500 mx-auto mb-4" />
          <h1 className="text-4xl font-display font-bold text-burgundy-800 mb-4">
            Reserve Your Royal Table
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Book your table at Maharaja Dining and experience the finest Indian cuisine 
            in an atmosphere of royal elegance and tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-display font-semibold text-burgundy-800 mb-6">
              Reservation Details
            </h2>
            <BookingForm />
          </div>

          {/* Restaurant Info */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-display font-semibold text-burgundy-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-royal-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600 text-sm">
                      123 Royal Plaza<br />
                      Grand Hotel Complex<br />
                      New Delhi, 110001
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-royal-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600 text-sm">+91 11 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-royal-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Opening Hours</p>
                    <p className="text-gray-600 text-sm">
                      Mon-Thu: 11:00 AM - 10:00 PM<br />
                      Fri-Sun: 11:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="bg-gradient-to-br from-royal-500 to-royal-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-display font-semibold mb-3">
                Important Notes
              </h3>
              <ul className="space-y-2 text-sm">
                <li>• Reservations are recommended, especially for dinner</li>
                <li>• Large groups (8+) require special arrangements</li>
                <li>• Smart casual dress code preferred</li>
                <li>• We accommodate dietary restrictions with advance notice</li>
                <li>• Cancellations accepted up to 2 hours before reservation</li>
              </ul>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg"
                alt="Restaurant Interior"
                className="w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;