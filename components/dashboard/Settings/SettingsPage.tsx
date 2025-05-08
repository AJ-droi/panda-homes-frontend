/* eslint-disable */
"use client"
import { useState } from 'react';
import NotificationPreferences from './NotificationPreferences';
import DocumentBranding from './DocumentBranding';
import { useUpdateUserMutation } from '@/services/users/mutation';
import { useRouter } from 'next/navigation';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    // email: '',
    // oldPassword: '',
    phone_number: '',
  });
    const [error, setError] = useState("");

  const router = useRouter()

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const { mutate, isPending } = useUpdateUserMutation();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Process form submission logic here
    console.log('Form submitted:', formData);

    mutate(
      formData,
      {
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (error: any) => {
          setError(error.message || "An error occurred during signup.");
          
        },
      }
    );
  };


  const handleReset = () => {

    setFormData({
      first_name: '',
      last_name: '',
      // email: '',
      // oldPassword: '',
      phone_number: '',
      // newPassword: ''
    });
    
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-4">
      <div className="w-full bg-white rounded border-2  overflow-hidden min-h-[95vh]">
        {/* Tabs */}
        <div className="flex flex-wrap border-b">
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'profile' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            Profile & Account Settings
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'notifications' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            Notification Preferences
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm md:text-base ${
              activeTab === 'branding' 
                ? 'text-[#785DBA] border-b-2 border-[#785DBA]' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('branding')}
          >
            Document Branding
          </button>
        </div>

        {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

        {/* Content Area */}
        <div className="p-6 md:p-10">
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#000]">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="first_name"
                    placeholder="Please enter your full name"
                    className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="last_name"
                    placeholder="Please enter your full name"
                    className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Email */}
                {/* <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Please enter your email"
                    className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div> */}

                  {/* Phone Number */}
                  <div>
                  <label htmlFor="phoneNumber" className="block text-gray-700 mb-2">
                    Phone number
                  </label>
                  <div className="flex">
                    <div className="bg-gray-100 rounded-l px-3 py-3 text-gray-500">
                      +234
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phone_number"
                      placeholder="Please enter your phone number"
                      className="w-full px-4 py-3 bg-gray-100 rounded-r focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>


                {/* Old Password */}
                {/* <div>
                  <label htmlFor="oldPassword" className="block text-gray-700 mb-2">
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Please enter your old password"
                    className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                  />
                </div> */}

                {/* New Password - Full Width on mobile, half width on desktop */}
                {/* <div>
                  <label htmlFor="newPassword" className="block text-gray-700 mb-2">
                    New password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Please enter your new password"
                    className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                  />
                </div> */}
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-3 bg-[#785DBA] text-white font-medium rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-[#785DBA]"
                >
                  Update Profile
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 text-gray-600 font-medium hover:text-gray-800 focus:outline-none"
                >
                  Reset
                </button>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
           <NotificationPreferences />
          )}

          {activeTab === 'branding' && (
           <DocumentBranding />
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;