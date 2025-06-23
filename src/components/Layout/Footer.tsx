import React from 'react';
import { Crown, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-burgundy-900 to-burgundy-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-royal-300" />
              <span className="text-2xl font-display font-bold">Maharaja Dining</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Experience the royal taste of authentic Indian cuisine in an elegant setting. 
              Every dish is crafted with premium ingredients and traditional recipes passed down through generations.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-royal-500 rounded-full flex items-center justify-center hover:bg-royal-600 transition-colors cursor-pointer">
                <span className="text-burgundy-900 font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-royal-500 rounded-full flex items-center justify-center hover:bg-royal-600 transition-colors cursor-pointer">
                <span className="text-burgundy-900 font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-royal-500 rounded-full flex items-center justify-center hover:bg-royal-600 transition-colors cursor-pointer">
                <span className="text-burgundy-900 font-bold">i</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-royal-300">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-royal-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">123 Royal Plaza</p>
                  <p className="text-gray-300 text-sm">Grand Hotel Complex</p>
                  <p className="text-gray-300 text-sm">New Delhi, 110001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-royal-300 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+91 9560717377</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-royal-300 flex-shrink-0" />
                <p className="text-gray-300 text-sm">namanalagh783@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4 text-royal-300">Opening Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-royal-300 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Monday - Thursday</p>
                  <p className="text-gray-300 text-sm">11:00 AM - 10:00 PM</p>
                </div>
              </div>
              <div className="ml-8">
                <p className="text-gray-300 text-sm">Friday - Sunday</p>
                <p className="text-gray-300 text-sm">11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-burgundy-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Maharaja Dining. All rights reserved. | Developed by Naman Alagh.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;