"use client"
/* eslint-disable */
import { ArrowLeft} from "lucide-react";
import { useState } from "react";
import InputField from "../InputField";
import Dropdown2 from "../Dropdown2";

const GroupPropertyForm = () => {
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
    setFormData((prev:any) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReview = () => {
    console.log('Form data:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <ArrowLeft className="w-6 h-6 text-gray-600 mr-3" />
          <h1 className="text-lg font-semibold text-gray-900">Group Property</h1>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
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
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t border-gray-200">
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

export default GroupPropertyForm;

