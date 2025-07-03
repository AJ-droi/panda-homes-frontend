/* eslint-disable */
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Calendar, MapPin, Building, Users, FileText } from 'lucide-react';

// Reusable Input Component
const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  icon: Icon, 
  placeholder,
  prefix,
  className = '' 
}:any) => {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        )}
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3 py-3 border border-gray-300 rounded-4xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
            Icon || prefix ? 'pl-9' : ''
          }`}
        />
      </div>
    </div>
  );
};

// Tab Component
const Tab = ({ active, onClick, children }:any) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
        active 
          ? 'border-blue-500 text-blue-600' 
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      {children}
    </button>
  );
};

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('KYC');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: 'Azusa',
    lastName: 'Nakano',
    phoneNumber: '+44 (123) 456-9878',
    email: 'elementary221b@gmail.com',
    dateOfBirth: '18th June 2025',
    nationality: 'Nigerian',
    stateOfOrigin: 'Lagos',
    localGovernmentArea: 'LGA',
    religion: 'Christianity',
    previousResidence: 'Ibeju-Lekki',
    maritalStatus: 'Married',
    spouseName: 'Magna',
    occupation: 'Product Analyst',
    employerName: 'Ano Uche',
    jobTitle: 'Manager',
    employerAddress: 'Ikoyi',
    employerPhone: '(684) 555-0102',
    monthlyIncome: '10,000,000,000,000',
    referenceName: 'Albert Flores',
    referenceRelationship: 'Employer',
    referenceAddress: 'Jakande',
    referencePhone: '(406) 555-0120'
  });

  const handleInputChange = (field:any) => (e:any) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-20">
          <div className="flex items-center py-4">
            <ArrowLeft className="w-5 h-5 text-gray-600 mr-3 cursor-pointer hover:text-gray-800 transition-colors" />
            <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl px-4 sm:px-6 lg:px-20 py-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <Tab active={activeTab === 'KYC'} onClick={() => setActiveTab('KYC')}>
                KYC
              </Tab>
              <Tab active={activeTab === 'Change Password'} onClick={() => setActiveTab('Change Password')}>
                Change Password
              </Tab>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'KYC' && (
              <div className="space-y-8">
                {/* Personal Info Section */}
                <div className='flex justify-between border-b pb-4 w-full'>
                  <h2 className="text-lg font-medium text-gray-900 mb-6 w-[25%]">Personal Info</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[75%] border rounded-xl p-8">
                    <InputField
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      icon={User}
                    />
                    <InputField
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      icon={User}
                    />
                    <InputField
                      label="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange('phoneNumber')}
                      icon={Phone}
                    />
                    <InputField
                      label="Email Address"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      type="email"
                      icon={Mail}
                    />
                    <InputField
                      label="Date of birth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange('dateOfBirth')}
                      icon={Calendar}
                    />
                    <InputField
                      label="Nationality"
                      value={formData.nationality}
                      onChange={handleInputChange('nationality')}
                    />
                    <InputField
                      label="State of Origin"
                      value={formData.stateOfOrigin}
                      onChange={handleInputChange('stateOfOrigin')}
                      icon={MapPin}
                    />
                    <InputField
                      label="Local Government Area"
                      value={formData.localGovernmentArea}
                      onChange={handleInputChange('localGovernmentArea')}
                    />
                    <InputField
                      label="Religion"
                      value={formData.religion}
                      onChange={handleInputChange('religion')}
                    />
                    <InputField
                      label="Previous Residence"
                      value={formData.previousResidence}
                      onChange={handleInputChange('previousResidence')}
                      icon={MapPin}
                    />
                    <InputField
                      label="Marital Status"
                      value={formData.maritalStatus}
                      onChange={handleInputChange('maritalStatus')}
                    />
                    <InputField
                      label="Spouse's Name & Contact"
                      value={formData.spouseName}
                      onChange={handleInputChange('spouseName')}
                      icon={Users}
                    />
                  </div>
                </div>

                {/* Employment & Income Information */}
                <div className='flex justify-between border-b pb-4 w-full '>
                  <h2 className="text-lg font-medium text-gray-900 mb-6 w-[25%]">Employment & Income Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[75%] border rounded-xl p-8">
                    <InputField
                      label="Occupation"
                      value={formData.occupation}
                      onChange={handleInputChange('occupation')}
                      icon={Building}
                    />
                    <InputField
                      label="Employer Name"
                      value={formData.employerName}
                      onChange={handleInputChange('employerName')}
                      icon={Building}
                    />
                    <InputField
                      label="Job Title/Position"
                      value={formData.jobTitle}
                      onChange={handleInputChange('jobTitle')}
                    />
                    <InputField
                      label="Employer Address"
                      value={formData.employerAddress}
                      onChange={handleInputChange('employerAddress')}
                      icon={MapPin}
                    />
                    <InputField
                      label="Employer Phone Number"
                      value={formData.employerPhone}
                      onChange={handleInputChange('employerPhone')}
                      icon={Phone}
                    />
                    <InputField
                      label="Monthly Net Income"
                      value={formData.monthlyIncome}
                      onChange={handleInputChange('monthlyIncome')}
                    />
                  </div>
                </div>

                {/* References */}
                <div className='flex justify-between w-full '>
                  <h2 className="text-lg font-medium text-gray-900 mb-6 w-[25%]">References</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[75%] border rounded-xl p-8">
                    <InputField
                      label="Name"
                      value={formData.referenceName}
                      onChange={handleInputChange('referenceName')}
                      icon={User}
                    />
                    <InputField
                      label="Relationship"
                      value={formData.referenceRelationship}
                      onChange={handleInputChange('referenceRelationship')}
                    />
                    <InputField
                      label="Address"
                      value={formData.referenceAddress}
                      onChange={handleInputChange('referenceAddress')}
                      icon={MapPin}
                    />
                    <InputField
                      label="Phone number"
                      value={formData.referencePhone}
                      onChange={handleInputChange('referencePhone')}
                      icon={Phone}
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Change Password' && (
              <div className="space-y-6 max-w-md">
                <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
                <InputField
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                />
                <InputField
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                />
                <InputField
                  label="Confirm New Password"
                  type="password"
                  placeholder="Confirm new password"
                />
                <div className="pt-4">
                  <button className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Update Password
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;