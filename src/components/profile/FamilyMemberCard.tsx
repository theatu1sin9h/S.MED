import React from 'react';
import { User, Trash2, Edit } from 'lucide-react';
import { FamilyMember } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onEdit: (member: FamilyMember) => void;
  onDelete: (id: string) => void;
}

const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({ member, onEdit, onDelete }) => {
  return (
    <Card className="h-full">
      <div className="flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.relationship}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(member)} 
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Edit size={18} />
            </button>
            <button 
              onClick={() => onDelete(member.id)} 
              className="p-1 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Blood Group</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{member.bloodGroup}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{member.phone}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FamilyMemberCard;