import React, { useState } from 'react';
import { 
  MapPin, 
  Filter, 
  Search, 
  X, 
  Calendar, 
  Clock 
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import HospitalCard from '../components/hospitals/HospitalCard';
import { Hospital, HospitalCategory } from '../types';

const Hospitals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HospitalCategory | 'All'>('All');
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [showMap, setShowMap] = useState(false);
  
  // Mock hospitals data
  const [hospitals] = useState<Hospital[]>([
    {
      id: '1',
      name: 'City General Hospital',
      category: 'General',
      address: '123 Healthcare Blvd, Medical District, CA 94103',
      location: { lat: 37.7749, lng: -122.4194 },
      registrationFee: 75,
      doctorAvailability: 'Mon-Fri: 8:00 AM - 8:00 PM',
      contactNumber: '(555) 123-4567',
    },
    {
      id: '2',
      name: 'University Medical Center',
      category: 'Teaching',
      address: '456 Education Lane, Academic Heights, CA 94110',
      location: { lat: 37.7549, lng: -122.4094 },
      registrationFee: 90,
      doctorAvailability: 'Mon-Sun: 24 hours',
      contactNumber: '(555) 234-5678',
    },
    {
      id: '3',
      name: 'Emergency Care Hospital',
      category: 'Acute Care',
      address: '789 Urgent St, Critical Junction, CA 94107',
      location: { lat: 37.7649, lng: -122.3994 },
      registrationFee: 120,
      doctorAvailability: 'Mon-Sun: 24 hours',
      contactNumber: '(555) 345-6789',
    },
    {
      id: '4',
      name: 'Community Health Center',
      category: 'Community',
      address: '101 Wellness Way, Neighborly Hills, CA 94112',
      location: { lat: 37.7349, lng: -122.4294 },
      registrationFee: 40,
      doctorAvailability: 'Mon-Sat: 9:00 AM - 5:00 PM',
      contactNumber: '(555) 456-7890',
    },
    {
      id: '5',
      name: 'Research Medical Institute',
      category: 'Research',
      address: '202 Discovery Drive, Innovation Park, CA 94105',
      location: { lat: 37.7849, lng: -122.3894 },
      registrationFee: 85,
      doctorAvailability: 'Mon-Fri: 8:00 AM - 6:00 PM',
      contactNumber: '(555) 567-8901',
    },
    {
      id: '6',
      name: 'Rehabilitation & Recovery Center',
      category: 'Long-term Care',
      address: '303 Healing Path, Recovery Ridge, CA 94115',
      location: { lat: 37.7949, lng: -122.4294 },
      registrationFee: 65,
      doctorAvailability: 'Mon-Sun: 7:00 AM - 9:00 PM',
      contactNumber: '(555) 678-9012',
    },
  ]);
  
  // Filter hospitals based on search term and category
  const filteredHospitals = hospitals.filter(hospital => 
    (searchTerm === '' || 
     hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     hospital.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'All' || hospital.category === selectedCategory)
  );
  
  // Hospital categories
  const categories: (HospitalCategory | 'All')[] = [
    'All',
    'General',
    'Teaching',
    'Acute Care',
    'Long-term Care',
    'Community',
    'Research',
    'Trauma Care',
  ];
  
  // Handle booking appointment
  const handleBookAppointment = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsBookingAppointment(true);
  };
  
  // Handle view hospital on map
  const handleViewMap = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setShowMap(true);
  };
  
  // Handle closing the modals
  const handleCloseModal = () => {
    setIsBookingAppointment(false);
    setShowMap(false);
    setSelectedHospital(null);
  };
  
  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would book the appointment
    setIsBookingAppointment(false);
    setSelectedHospital(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Hospital Directory</h1>
      
      {/* Search and Filter Bar */}
      <Card className="mb-8">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Input
                placeholder="Search hospitals by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon={<Search />}
                fullWidth
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="w-full md:w-auto">
              <Button
                variant="outline"
                icon={<Filter size={18} />}
                className="w-full md:w-auto"
              >
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Hospital List */}
      {filteredHospitals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onBook={handleBookAppointment}
              onViewMap={handleViewMap}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <MapPin className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No hospitals found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-4">
            We couldn't find any hospitals matching your search criteria. Try adjusting your filters or search term.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            icon={<X size={16} />}
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Map Modal */}
      {showMap && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedHospital.name} Location</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-96 flex items-center justify-center mb-4">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Map integration would display here (using Google Maps API)
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Location: {selectedHospital.location.lat}, {selectedHospital.location.lng}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Address</h4>
                <p className="text-gray-700 dark:text-gray-300">{selectedHospital.address}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Contact</h4>
                <p className="text-gray-700 dark:text-gray-300">{selectedHospital.contactNumber}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-2">Hours</h4>
                <p className="text-gray-700 dark:text-gray-300">{selectedHospital.doctorAvailability}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
              <Button
                variant="outline"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleCloseModal();
                  handleBookAppointment(selectedHospital);
                }}
                icon={<Clock size={16} />}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Booking Modal */}
      {isBookingAppointment && selectedHospital && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Book Appointment</h3>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="p-6 space-y-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                  <h4 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-1">{selectedHospital.name}</h4>
                  <p className="text-blue-700 dark:text-blue-400 text-sm">{selectedHospital.address}</p>
                </div>
                
                <Input
                  label="Patient Name"
                  id="patient-name"
                  required
                  fullWidth
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Appointment Date"
                    type="date"
                    id="appointment-date"
                    icon={<Calendar />}
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Appointment Time"
                    type="time"
                    id="appointment-time"
                    icon={<Clock />}
                    required
                    fullWidth
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reason for Visit
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Please describe your symptoms or reason for appointment"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Preferred Department/Specialist (Optional)
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select department or specialist</option>
                    <option value="general">General Medicine</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="neurology">Neurology</option>
                    <option value="gynecology">Gynecology</option>
                    <option value="pediatrics">Pediatrics</option>
                    <option value="dermatology">Dermatology</option>
                    <option value="ophthalmology">Ophthalmology</option>
                  </select>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="insurance"
                      name="insurance"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="insurance" className="text-gray-700 dark:text-gray-300">
                      I have health insurance
                    </label>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">Registration Fee:</span>
                    <span className="text-lg font-medium text-gray-900 dark:text-white">${selectedHospital.registrationFee}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hospitals;