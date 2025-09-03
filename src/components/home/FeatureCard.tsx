import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, to, color }) => {
  return (
    <Link to={to} className="block transition-transform duration-300 hover:scale-105">
      <Card className="h-full flex flex-col">
        <div className="flex flex-col items-center text-center p-4">
          <div className={`p-3 rounded-full mb-4 ${color}`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default FeatureCard;