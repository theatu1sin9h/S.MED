import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Filter, 
  Calendar, 
  Search,
  X,
  CheckCircle
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import HealthRecordCard from '../components/records/HealthRecordCard';
import { HealthRecord } from '../types';

const Records: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  
  // Mock health records data
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([
    {
      id: '1',
      date: '2023-03-15',
      patientName: 'John Doe',
      symptoms: ['Fever', 'Sore throat', 'Cough'],
      diagnosis: 'Common Cold',
      medicines: ['Paracetamol', 'Cough syrup', 'Vitamin C'],
      doctorName: 'Sarah Johnson',
      hospitalName: 'City General Hospital',
      digitalSignature: 'dr_sarah_johnson_123',
    },
    {
      id: '2',
      date: '2023-02-08',
      patientName: 'John Doe',
      symptoms: ['Headache', 'Fatigue', 'Runny nose'],
      diagnosis: 'Seasonal Allergy',
      medicines: ['Cetirizine', 'Nasal spray'],
      doctorName: 'Mike Wilson',
      hospitalName: 'MedCare Clinic',
      digitalSignature: 'dr_mike_wilson_456',
    },
    {
      id: '3',
      date: '2023-01-22',
      patientName: 'Emily Doe',
      symptoms: ['Stomachache', 'Nausea'],
      diagnosis: 'Gastroenteritis',
      medicines: ['Omeprazole', 'Probiotics'],
      doctorName: 'Lisa Chen',
      hospitalName: 'Community Health Center',
      digitalSignature: 'dr_lisa_chen_789',
    },
  ]);
  
  // Filter records based on search term
  const filteredRecords = healthRecords.filter(record => 
    record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Handle viewing a record
  const handleViewRecord = (record: HealthRecord) => {
    setSelectedRecord(record);
  };
  
  // Handle closing the record detail view
  const handleCloseRecordView = () => {
    setSelectedRecord(null);
  };
  
  // Handle add record form submission
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the record to the database
    setIsAddingRecord(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">Health Records</h1>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
          <Button
            variant="primary"
            onClick={() => setIsAddingRecord(true)}
            icon={<Plus size={18} />}
          >
            Add New Record
          </Button>
          <Button
            variant="outline"
            icon={<Filter size={18} />}
          >
            Filter
          </Button>
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      <Card className="mb-8">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <Input
                placeholder="Search by diagnosis, doctor, or hospital..."
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
            <div className="w-full sm:w-48">
              <Input
                type="date"
                icon={<Calendar />}
                fullWidth
              />
            </div>
          </div>
        </div>
      </Card>
      
      {/* Record List */}
      {filteredRecords.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRecords.map((record) => (
            <HealthRecordCard
              key={record.id}
              record={record}
              onView={handleViewRecord}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
          <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
            No health records found
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-4">
            {searchTerm 
              ? "No records match your search criteria. Try different keywords or clear the search."
              : "You haven't added any health records yet. Start by adding your first record."}
          </p>
          {searchTerm ? (
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              icon={<X size={16} />}
            >
              Clear Search
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => setIsAddingRecord(true)}
              icon={<Plus size={16} />}
            >
              Add First Record
            </Button>
          )}
        </div>
      )}
      
      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Health Record Details</h3>
              <button 
                onClick={handleCloseRecordView}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{selectedRecord.diagnosis}</h4>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  {selectedRecord.date}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Patient Information</h5>
                  <Card>
                    <div className="p-3">
                      <p className="text-gray-800 dark:text-gray-200">{selectedRecord.patientName}</p>
                    </div>
                  </Card>
                </div>
                
                <div>
                  <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Medical Provider</h5>
                  <Card>
                    <div className="p-3 space-y-2">
                      <p className="text-gray-800 dark:text-gray-200">Dr. {selectedRecord.doctorName}</p>
                      <p className="text-gray-600 dark:text-gray-400">{selectedRecord.hospitalName}</p>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Symptoms</h5>
                <Card>
                  <div className="p-3">
                    <div className="flex flex-wrap gap-2">
                      {selectedRecord.symptoms.map((symptom, index) => (
                        <span 
                          key={index}
                          className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className="mb-6">
                <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Prescribed Medicines</h5>
                <Card>
                  <div className="p-3">
                    <ul className="space-y-2">
                      {selectedRecord.medicines.map((medicine, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-800 dark:text-gray-200">{medicine}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
              
              <div>
                <h5 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Digital Signature</h5>
                <Card>
                  <div className="p-3">
                    <p className="text-sm font-mono text-gray-600 dark:text-gray-400">{selectedRecord.digitalSignature}</p>
                  </div>
                </Card>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end">
              <Button
                variant="outline"
                onClick={handleCloseRecordView}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Record Modal */}
      {isAddingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add New Health Record</h3>
              <button 
                onClick={() => setIsAddingRecord(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddRecord}>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    type="date"
                    id="record-date"
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Patient Name"
                    id="patient-name"
                    required
                    fullWidth
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Symptoms
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Enter symptoms separated by commas"
                    required
                  />
                </div>
                
                <Input
                  label="Diagnosis"
                  id="diagnosis"
                  required
                  fullWidth
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prescribed Medicines
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    rows={3}
                    placeholder="Enter medicines separated by commas"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Doctor Name"
                    id="doctor-name"
                    required
                    fullWidth
                  />
                  
                  <Input
                    label="Hospital Name"
                    id="hospital-name"
                    required
                    fullWidth
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Upload Record Document (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-700 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white dark:bg-gray-900 rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        PDF, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddingRecord(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Save Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;