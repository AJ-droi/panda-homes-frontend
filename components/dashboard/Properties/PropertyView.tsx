/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Edit3} from 'lucide-react';
import InputField from '@/components/InputField';
import { useFetchPropertyById } from '@/services/property/query';
import { useParams } from 'next/navigation';
import BackButton from '@/components/Backbutton';
import { useDeletePropertyMutation, useUpdatePropertyMutation } from '@/services/property/mutation';
import { toast } from 'react-toastify';
// adjust the path as needed

type PropertyField =
  | 'name'
  | 'location'
  | 'description'
  | 'occupancy_status'
  | 'service_charge'
  | 'security_deposit'
  | 'lease_start_date'
  | 'rental_price'
  | 'lease_end_date'
  | 'rent_status'
  | 'first_name'
  | 'last_name'
  | 'phone_number'
  | 'email';

const PropertyView = () => {
  const [editMode, setEditMode] = useState<Record<PropertyField, boolean>>({
    name: false,
    location: false,
    description: false,
    occupancy_status: false,
    service_charge: false,
    security_deposit: false,
    lease_start_date: false,
    rental_price: false,
    lease_end_date: false,
    rent_status: false,
    first_name: false,
    last_name: false,
    phone_number: false,
    email: false
  });

  const [propertyData, setPropertyData] = useState<Record<PropertyField, string>>({
    name: 'Apartment 1',
    location: '21 Ibiyinka Salvador Street',
    description: 'Beautiful 2-bedroom flat with modern amenities.',
    occupancy_status: 'Vacant',
    service_charge: '500,000',
    security_deposit: '500,000',
    lease_start_date: 'June 5th, 2022',
    rental_price: '500,000',
    lease_end_date: 'June 5th, 2023',
    rent_status: 'Paid',
    first_name: 'Jon',
    last_name: 'Doe',
    phone_number: '08012345678',
    email: 'johndoe@gmail.com'
  });

  const toggleEditMode = (field: PropertyField) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleEditPropertyMode = () => {
    setEditMode(prev => ({
      ...prev,
      name: !prev.name,
      location: !prev.location,
      description: !prev.description,
      occupancy_status: !prev.occupancy_status,
    }));
  }

  const {id} = useParams<{id:string}>()

  const {data} = useFetchPropertyById(id) 

  const {mutate, isPending} = useUpdatePropertyMutation(id)

const deleteMutation = useDeletePropertyMutation();

const handleDelete = async () => {
  try {
     await deleteMutation.mutateAsync(id);
     window.location.href = '/dashboard/properties'
  } catch (error:any) {
    toast.error(error.message);
  }
};

  useEffect(() =>{
    if(data){
      setPropertyData(data)
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({ ...prev, [name as PropertyField]: value }));
  };

  const handleSubmit = () => {

    const payload = {
      ...propertyData,
      rental_price: Number(propertyData.rental_price),
      service_charge: Number(propertyData.service_charge),
      security_deposit: Number(propertyData.security_deposit),
      lease_start_date: new Date(propertyData.lease_start_date).toISOString(),
      lease_end_date: new Date(propertyData.lease_end_date).toISOString(),  
    }

    mutate(payload, {
      onSuccess: () => {
       toast.success('Property data updated successfully');
       window.location.reload();
      },
      onError: (error) => {
        toast.error('Error updating property data:', error);
      }
    })
    console.log('Saving property data:', propertyData);
    const resetEditMode = Object.keys(editMode).reduce((acc, key) => {
      acc[key as PropertyField] = false;
      return acc;
    }, {} as Record<PropertyField, boolean>);
    setEditMode(resetEditMode);
  };

  const renderField = (label: string, field: PropertyField, type: string = 'text') => (
    <div className='py-2'>
      <label className="text-sm text-gray-800 font-medium">{label}</label>
      {editMode[field] ? (
        <InputField
          name={field}
          value={propertyData[field]}
          onChange={handleChange}
          type={type}
        />
      ) : (
        <div className="flex items-center justify-between mt-1">
          <p className="text-gray-500 text-[14px]">{propertyData[field]}</p>
          <button onClick={() => toggleEditMode(field)}>
            <Edit3 size={16} className="text-gray-500" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="space-y-8">

          {/* Property Details Section */}
          <div className="">
            <div className="flex items-center mb-6">
             <BackButton />
              <h2 className="text-xl font-semibold text-gray-700">Property Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('Property Name', 'name')}
              {renderField('Property Address', 'location')}
            </div>

            {renderField('Description', 'description')}
            {renderField('Current Occupancy Status', 'occupancy_status')}

            <div className="flex justify-between gap-4 mt-6">
              <button
                type="button"
                className="px-6 py-2 border border-[#785DBA] text-[#785DBA] rounded-lg hover:bg-purple-50 transition-colors text-[12px]"
                onClick={() => toggleEditPropertyMode()}
              >
                Edit Property
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px]"
                onClick={() => handleDelete()}
              >
                Delete Property
              </button>
            </div>
          </div>

          {/* Tenancy Details Section */}
          {data?.occupancy_status !== 'vacant' && <div className="">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Tenancy Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('Service Charge', 'service_charge')}
              {renderField('Security Deposit', 'security_deposit')}
              {renderField('Lease Start Date', 'lease_start_date')}
              {renderField('Rental Price', 'rental_price')}
              {renderField('Lease End Date', 'lease_end_date')}
            </div>
            {renderField('Rent Status', 'rent_status')}

            <div className="mt-6">
              <button
                type="button"
                className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px]"
              >
                End Tenancy
              </button>
            </div>
          </div>}

          {/* Tenant Details Section */}
          {data?.occupancy_status !== 'vacant' && <div className="">
            <h2 className="text-xl font-semibold text-gray-700 mb-6">Tenant Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField('First Name', 'first_name')}
              {renderField('Last Name', 'last_name')}
              {renderField('Phone Number', 'phone_number')}
              {/* {renderField('Email', 'email', 'email')} */}
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="px-6 py-2 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors text-[12px]"
              >
                View KYC
              </button>
            </div>
          </div>}

          {/* Save Changes Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-[#785DBA] text-white rounded-lg hover:bg-[#785DBA] transition-colors font-medium text-[12px]"
            >
             {isPending ? 'Saving Changes...' : 'Save Changes'} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyView;
