import React from 'react';
import { Crown, ChefHat, Clock, MapPin } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Crown,
      title: 'Royal Experience',
      description: 'Dine like royalty with our authentic Maharaja-style service and ambiance',
    },
    {
      icon: ChefHat,
      title: 'Master Chefs',
      description: 'Our experienced chefs bring decades of culinary expertise to every dish',
    },
    {
      icon: Clock,
      title: 'Fresh Daily',
      description: 'All ingredients sourced fresh daily to ensure the highest quality meals',
    },
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Located in the heart of the city with elegant hotel accommodations',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-burgundy-800 mb-4">
            Why Choose Maharaja Dining?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine traditional recipes with modern presentation to create an unforgettable dining experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-royal-500 to-royal-600 rounded-full mb-6 group-hover:shadow-lg transition-shadow">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-semibold text-burgundy-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;