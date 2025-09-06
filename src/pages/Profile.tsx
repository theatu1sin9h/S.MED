import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Droplet, PlusCircle, X } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import FamilyMemberCard from '../components/profile/FamilyMemberCard';
import { User as UserType, FamilyMember } from '../types';
// Define UserRole enum or import it as a value, not just a type
enum UserRole {
  User = 'User',
  Admin = 'Admin',
  // add other roles as needed
}

const Profile: React.FC = () => {
  // Mock user data
  const [user, setUser] = useState<UserType>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare St, Medical City, CA 94103',
    bloodGroup: 'O+',
    role: UserRole.User, // or whatever default role fits your app
    verified: false, // or true, depending on your logic
  });

  // Mock family members data
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Jane Doe',
      relationship: 'Spouse',
      bloodGroup: 'A+',
      phone: '+1 (555) 987-6543',
    },
    {
      id: '2',
      name: 'Emily Doe',
      relationship: 'Daughter',
      bloodGroup: 'O+',
      phone: '+1 (555) 456-7890',
    },
  ]);

  // State for editing user profile
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState<UserType>(user);

  // State for managing family member form
  const [isAddingFamilyMember, setIsAddingFamilyMember] = useState(false);
  const [isEditingFamilyMember, setIsEditingFamilyMember] = useState(false);
  const [currentFamilyMember, setCurrentFamilyMember] = useState<FamilyMember>({
    id: '',
    name: '',
    relationship: '',
    bloodGroup: '',
    phone: '',
  });

  // Handle profile edit submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(editedUser);
    setIsEditingProfile(false);
  };

  // Handle profile edit cancel
  const handleProfileCancel = () => {
    setEditedUser(user);
    setIsEditingProfile(false);
  };

  // Handle family member form submission
  const handleFamilyMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditingFamilyMember) {
      // Update existing family member
      setFamilyMembers(familyMembers.map(member => 
        member.id === currentFamilyMember.id ? currentFamilyMember : member
      ));
    } else {
      // Add new family member
      const newMember = {
        ...currentFamilyMember,
        id: Date.now().toString(), // Simple ID generation
      };
      setFamilyMembers([...familyMembers, newMember]);
    }
    
    resetFamilyMemberForm();
  };

  // Handle family member deletion
  const handleDeleteFamilyMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  // Handle edit family member
  const handleEditFamilyMember = (member: FamilyMember) => {
    setCurrentFamilyMember(member);
    setIsEditingFamilyMember(true);
    setIsAddingFamilyMember(true);
  };

  // Reset family member form
  const resetFamilyMemberForm = () => {
    setCurrentFamilyMember({
      id: '',
      name: '',
      relationship: '',
      bloodGroup: '',
      phone: '',
    });
    setIsAddingFamilyMember(false);
    setIsEditingFamilyMember(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Profile Section */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            {!isEditingProfile ? (
              <>
                <div className="flex flex-col items-center p-4 text-center">
                  <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{user.name}</h2>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-medium mb-4">
                    <Droplet className="h-3 w-3 mr-1" />
                    {user.bloodGroup}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                        <p className="text-gray-800 dark:text-gray-200">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
                        <p className="text-gray-800 dark:text-gray-200">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-500">Address</p>
                        <p className="text-gray-800 dark:text-gray-200">{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setIsEditingProfile(true)}
                  >
                    Edit Profile
                  </Button>
                </div>
              </>
            ) : (
              <form onSubmit={handleProfileSubmit}>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Edit Profile</h3>
                  
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      icon={<User />}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      icon={<Mail />}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Phone"
                      id="phone"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      icon={<Phone />}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Address"
                      id="address"
                      value={editedUser.address}
                      onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                      icon={<MapPin />}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Blood Group"
                      id="bloodGroup"
                      value={editedUser.bloodGroup}
                      onChange={(e) => setEditedUser({...editedUser, bloodGroup: e.target.value})}
                      icon={<Droplet />}
                      required
                      fullWidth
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleProfileCancel}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
        
        {/* Family Members Section */}
        <div className="lg:col-span-2">
          <Card>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">Family Members</h3>
              {!isAddingFamilyMember && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddingFamilyMember(true)}
                  icon={<PlusCircle size={16} />}
                >
                  Add Family Member
                </Button>
              )}
            </div>
            
            <div className="p-4">
              {isAddingFamilyMember ? (
                <form onSubmit={handleFamilyMemberSubmit} className="mb-6 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-800 dark:text-white">
                      {isEditingFamilyMember ? 'Edit Family Member' : 'Add Family Member'}
                    </h4>
                    <button
                      type="button"
                      onClick={resetFamilyMemberForm}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      id="familyMemberName"
                      value={currentFamilyMember.name}
                      onChange={(e) => setCurrentFamilyMember({...currentFamilyMember, name: e.target.value})}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Relationship"
                      id="relationship"
                      value={currentFamilyMember.relationship}
                      onChange={(e) => setCurrentFamilyMember({...currentFamilyMember, relationship: e.target.value})}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Blood Group"
                      id="familyMemberBloodGroup"
                      value={currentFamilyMember.bloodGroup}
                      onChange={(e) => setCurrentFamilyMember({...currentFamilyMember, bloodGroup: e.target.value})}
                      required
                      fullWidth
                    />
                    
                    <Input
                      label="Phone"
                      id="familyMemberPhone"
                      value={currentFamilyMember.phone}
                      onChange={(e) => setCurrentFamilyMember({...currentFamilyMember, phone: e.target.value})}
                      required
                      fullWidth
                    />
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="primary"
                      type="submit"
                    >
                      {isEditingFamilyMember ? 'Update' : 'Add'}
                    </Button>
                  </div>
                </form>
              ) : null}
              
              {familyMembers.length === 0 && !isAddingFamilyMember ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">No family members added yet</p>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddingFamilyMember(true)}
                    icon={<PlusCircle size={16} />}
                  >
                    Add Family Member
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {familyMembers.map((member) => (
                    <FamilyMemberCard
                      key={member.id}
                      member={member}
                      onEdit={handleEditFamilyMember}
                      onDelete={handleDeleteFamilyMember}
                    />
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;