"use client"
/* eslint-disable */
import { ArrowLeft, X } from "lucide-react";
import InputField from "../InputField";
import Dropdown2 from "../Dropdown2";
import { useState } from "react";

const GroupPropertyModal = ({ isOpen = true, onClose = () => {} }) => {
  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
    property: ''
  });

  const propertyOptions = [
    'Flat 1',
    'Flat 2',
    'Flat 3',
    'Flat 4',
    'Flat 5'
  ];

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReview = () => {
    console.log('Form data:', formData);
    // Handle form submission here
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0  bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-screen overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <ArrowLeft 
              className="w-6 h-6 text-gray-600 mr-3 cursor-pointer hover:text-gray-800"
              onClick={onClose}
            />
            <h1 className="text-lg font-semibold text-gray-900">Group Property</h1>
          </div>
          <X 
            className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800"
            onClick={onClose}
          />
        </div>

        {/* Form Content - Scrollable */}
        <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
          {/* Group Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <InputField
              name="groupName"
              placeholder="E.g. Palm View Estate"
              value={formData.groupName}
              onChange={handleInputChange}
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <InputField
              name="description"
              placeholder="e.g., Block of 6 Flats"
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>

          {/* Add New Properties Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add new properties
            </label>
            <Dropdown2
              name="property"
              options={propertyOptions}
              placeholder="Flat 1"
              selectedOption={formData.property}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Review Button */}
        <div className="p-6 bg-white border-t border-gray-200">
          <button
            onClick={handleReview}
            className="w-full bg-[#785DBA] text-white py-4 rounded-lg font-medium text-base hover:bg-purple-700 transition-colors"
          >
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupPropertyModal;