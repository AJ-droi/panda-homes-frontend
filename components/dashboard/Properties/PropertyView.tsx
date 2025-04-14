/*eslint-disable */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Calendar, Edit2, Edit3 } from "lucide-react";

const PropertyView: React.FC = () => {
  // State for all editable fields
  const [propertyData, setPropertyData] = useState({
    description: "At vero eos et iusto odio dignissimos ducimus, qui haec putat, ut ipsi auctori huius disciplinae placet: constituam, quid sit numeranda nec me ab illo inventore veritatis et expedita distinctio nam libero tempore, cum memoriter, tum etiam ac ratione.",
    propertyName: "Oakwood Apartment",
    rentStatus: "Paid",
    tenantName: "Jon Doe",
    propertyType: "Duplex",
    leaseStartDate: "June 5th, 2022",
    occupancyStatus: "Vacant",
    leaseEndDate: "June 5th, 2023",
    rentalPrice: "500,000",
    countryCode: "+234",
    phoneNumber: "8023456789",
    serviceCharge: "500,000"
  });

  // State to track which fields are in edit mode
  const [editMode, setEditMode] = useState({
    description: false,
    propertyName: false,
    tenantName: false,
    leaseStartDate: false,
    leaseEndDate: false,
    rentalPrice: false,
    phoneNumber: false,
    serviceCharge: false
  }) as any

  // Function to toggle edit mode for a field
  const toggleEditMode = (field:any) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  // Function to handle input changes
  const handleChange = (field:any, value:any) => {
    setPropertyData({ ...propertyData, [field]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", propertyData);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm mt-6 mx-6">
      <form onSubmit={handleSubmit}>
        {/* Property Image and Description */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="relative w-full lg:w-1/3">
            <div className="relative h-48 w-full rounded-lg overflow-hidden">
              <Image 
                src="/house.png" 
                alt="Property Image" 
                fill
                className="object-cover"
              />
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full">
                <Edit2 size={18} className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 relative">
            <div className="border rounded-lg p-4 h-full">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-md font-medium text-gray-700">Description</h2>
                <button 
                  type="button"
                  onClick={() => toggleEditMode('description')}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <Edit3 size={18} />
                </button>
              </div>
              
              {editMode.description ? (
                <textarea
                  value={propertyData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={4}
                />
              ) : (
                <p className="text-gray-600 text-sm">{propertyData.description}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Property Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Name</label>
            <div className="relative">
              <input
                type="text"
                value={propertyData.propertyName}
                onChange={(e) => handleChange('propertyName', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                type="button"
                onClick={() => toggleEditMode('propertyName')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <Edit3 size={18} />
              </button>
            </div>
          </div>
          
          {/* Rent Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rent Status</label>
            <div className="relative">
              <select 
                value={propertyData.rentStatus}
                onChange={(e) => handleChange('rentStatus', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Partial">Partial</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Tenant's Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tenant's Name</label>
            <div className="relative">
              <input
                type="text"
                value={propertyData.tenantName}
                onChange={(e) => handleChange('tenantName', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                type="button"
                onClick={() => toggleEditMode('tenantName')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <Edit3 size={18} />
              </button>
            </div>
          </div>
          
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <div className="relative">
              <select 
                value={propertyData.propertyType}
                onChange={(e) => handleChange('propertyType', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Duplex">Duplex</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Condo">Condo</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Lease Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lease start date</label>
            <div className="relative">
              <input
                type="text"
                value={propertyData.leaseStartDate}
                onChange={(e) => handleChange('leaseStartDate', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Calendar size={18} />
              </div>
            </div>
          </div>
          
          {/* Current Occupancy Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupancy Status</label>
            <div className="relative">
              <select 
                value={propertyData.occupancyStatus}
                onChange={(e) => handleChange('occupancyStatus', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Vacant">Vacant</option>
                <option value="Occupied">Occupied</option>
                <option value="Pending">Pending</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Lease End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lease end date</label>
            <div className="relative">
              <input
                type="text"
                value={propertyData.leaseEndDate}
                onChange={(e) => handleChange('leaseEndDate', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Calendar size={18} />
              </div>
            </div>
          </div>
          
          {/* Rental Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rental Price</label>
            <div className="relative">
              <input
                type="text"
                value={propertyData.rentalPrice}
                onChange={(e) => handleChange('rentalPrice', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                type="button"
                onClick={() => toggleEditMode('rentalPrice')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <Edit3 size={18} />
              </button>
            </div>
          </div>
          
          {/* Property Manager/Landlord Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Manager/Landlord Contact</label>
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="flex items-center h-full">
                  <div className="bg-green-800 h-full w-2 mr-1"></div>
                  <div className="bg-green-800 h-full w-2 mr-2"></div>
                </div>
              </div>
              <input
                type="text"
                value={propertyData.countryCode}
                onChange={(e) => handleChange('countryCode', e.target.value)}
                className="w-16 p-3 bg-gray-50 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={propertyData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-r-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  type="button"
                  onClick={() => toggleEditMode('phoneNumber')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                >
                  <Edit3 size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Service Charge */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge</label>
            <div className="relative">
              <input
                type="text"
                value={propertyData.serviceCharge}
                onChange={(e) => handleChange('serviceCharge', e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                type="button"
                onClick={() => toggleEditMode('serviceCharge')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <Edit3 size={18} />
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <button type="button" className="px-5 py-2 border border-purple-500 text-purple-500 rounded-md hover:bg-purple-50">
          Edit Property
        </button>
        <button type="button" className="px-5 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600">
          Delete Property
        </button>
      </div>
    </div>
  );
};

export default PropertyView;