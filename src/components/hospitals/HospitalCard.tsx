import React from 'react';
import { MapPin, Phone, Clock, DollarSign, Building2 } from 'lucide-react';
import { Hospital } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface HospitalCardProps {
  hospital: Hospital;
  onBook: (hospital: Hospital) => void;
  onViewMap: (hospital: Hospital) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onBook, onViewMap }) => {
  // Function to get color based on hospital category
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      'General': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Teaching': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Acute Care': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Long-term Care': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Community': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Research': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Trauma Care': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    };
    
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(hospital.category)}`}>
            {hospital.category}
          </span>
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-2">{hospital.name}</h3>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{hospital.address}</span>
          </div>
          
          <div className="flex items-start">
            <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{hospital.contactNumber}</span>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{hospital.doctorAvailability}</span>
          </div>
          
          <div className="flex items-start">
            <DollarSign className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Registration Fee: ${hospital.registrationFee}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewMap(hospital)}
            className="flex-1"
            icon={<MapPin size={16} />}
          >
            View Map
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onBook(hospital)}
            className="flex-1"
            icon={<Clock size={16} />}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HospitalCard;