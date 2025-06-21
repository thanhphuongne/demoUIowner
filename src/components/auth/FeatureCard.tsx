import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description,
  gradientFrom,
  gradientTo
}) => {
  return (
    <div className="flex items-start space-x-4 p-4 lg:p-6 bg-white/60 backdrop-blur-sm rounded-xl lg:rounded-2xl">
      <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">{title}</h3>
        <p className="text-gray-600 text-sm lg:text-base">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;