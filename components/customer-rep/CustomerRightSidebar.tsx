/* eslint-disable */
import React from 'react'
import { Wrench, Zap, Droplets, Home } from 'lucide-react';

const CustomerRightSidebar = ({activeChat}:any) => {

      const getCategoryIcon = (category:any) => {
    switch(category) {
      case 'plumbing': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'electrical': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'hvac': return <Home className="w-4 h-4 text-green-500" />;
      default: return <Wrench className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority:any) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <>
      {activeChat ? (
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">First Name:</span>
                  <span className="text-sm text-gray-900">{activeChat.tenant_name.split(' ')[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Last Name:</span>
                  <span className="text-sm text-gray-900">{activeChat.tenant_name.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Phone Number:</span>
                  <span className="text-sm text-gray-900">{activeChat.tenant.user.phone_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Email:</span>
                  <span className="text-sm text-gray-900 truncate">{activeChat.tenant.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Apartment:</span>
                  <span className="text-sm text-gray-900">{activeChat.property_name}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Category:</span>
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(activeChat.issue_category)}
                    <span className="text-sm text-gray-900 capitalize">{activeChat.category}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Priority:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor('high')}`}>
                    {`High`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeChat.status === 'resolved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activeChat.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ): null}
      </>
  )
}

export default CustomerRightSidebar