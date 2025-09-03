import React from 'react';
import { Calendar, User, FileText, Activity, PillIcon, UserRound, Building2 } from 'lucide-react';
import { HealthRecord } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface HealthRecordCardProps {
  record: HealthRecord;
  onView: (record: HealthRecord) => void;
}

const HealthRecordCard: React.FC<HealthRecordCardProps> = ({ record, onView }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-white truncate">
              {record.diagnosis}
            </h3>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            {record.date}
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start">
            <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{record.patientName}</span>
          </div>
          
          <div className="flex items-start">
            <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-1">Symptoms</p>
              <div className="flex flex-wrap gap-1">
                {record.symptoms.map((symptom, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                  >
                    {symptom}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex items-start">
            <UserRound className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Dr. {record.doctorName}</span>
          </div>
          
          <div className="flex items-start">
            <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-2" />
            <span className="text-sm text-gray-700 dark:text-gray-300">{record.hospitalName}</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            fullWidth
            onClick={() => onView(record)}
          >
            View Full Record
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default HealthRecordCard;